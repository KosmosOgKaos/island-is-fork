import { Router } from 'express'
import { body, query, validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import { Entropy } from 'entropy-string'
import IslandisLogin, { VerifyResult } from '@island.is/login'
import { uuid } from 'uuidv4'
import kennitala from 'kennitala'

import { logger } from '@island.is/logging'
import {
  SSN_IS_NOT_A_PERSON,
  USER_NOT_OLD_ENOUGH,
} from '@island.is/gjafakort/consts'

import { Credentials } from '../../types'
import {
  ACCESS_TOKEN_COOKIE,
  CSRF_COOKIE,
  JWT_EXPIRES_IN_SECONDS,
  ONE_HOUR,
  REDIRECT_COOKIE,
} from './consts'
import { environment } from '../../environments'
import { getVersionConfiguration } from '../../services'

const router = Router()

const { samlEntryPoint, audience: audienceUrl, jwtSecret } = environment.auth
const loginIS = new IslandisLogin({
  audienceUrl,
})

router.post('/callback', [body('token').notEmpty()], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    logger.error(errors.array())
    return res.redirect('/error')
  }

  const { token } = req.body
  let verifyResult: VerifyResult
  try {
    verifyResult = await loginIS.verify(token)
  } catch (err) {
    logger.error(err)
    return res.redirect('/error')
  }

  const { returnUrl } = req.cookies[REDIRECT_COOKIE.name] || {}
  const { user } = verifyResult
  if (!user) {
    logger.error('Could not verify user authenticity')
    return res.redirect('/error')
  }

  if (!kennitala.isPerson(user.kennitala)) {
    logger.warn('User used company kennitala to log in')
    return res.redirect(`/error?errorType=${SSN_IS_NOT_A_PERSON}`)
  }

  const { yearBornLimit } = await getVersionConfiguration()

  const yearBorn = new Date(
    kennitala.info(user.kennitala).birthday,
  ).getFullYear()
  if (yearBorn > yearBornLimit) {
    logger.warn(`User born after ${yearBornLimit} logged in`)
    return res.redirect(`/error?errorType=${USER_NOT_OLD_ENOUGH}`)
  }

  const csrfToken = new Entropy({ bits: 128 }).string()
  const jwtToken = jwt.sign(
    {
      user: { ssn: user.kennitala, name: user.fullname, mobile: user.mobile },
      csrfToken,
    } as Credentials,
    jwtSecret,
    { expiresIn: JWT_EXPIRES_IN_SECONDS },
  )

  const tokenParts = jwtToken.split('.')
  if (tokenParts.length !== 3) {
    return res.redirect('/error')
  }

  const maxAge = JWT_EXPIRES_IN_SECONDS * 1000
  return res
    .cookie(CSRF_COOKIE.name, csrfToken, {
      ...CSRF_COOKIE.options,
      maxAge,
    })
    .cookie(ACCESS_TOKEN_COOKIE.name, jwtToken, {
      ...ACCESS_TOKEN_COOKIE.options,
      maxAge,
    })
    .redirect(returnUrl ?? '/notandi')
})

router.get(
  '/login',
  [
    query('returnUrl')
      .optional()
      .isString()
      .customSanitizer((value) => {
        if (!value || String(value).charAt(0) !== '/') {
          return '/'
        }
        return value
      }),
  ],
  (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() })
    }

    const { name, options } = REDIRECT_COOKIE
    res.clearCookie(name, options)
    const authId = uuid()
    const { returnUrl } = req.query

    return res
      .cookie(name, { authId, returnUrl }, { ...options, maxAge: ONE_HOUR })
      .redirect(`${samlEntryPoint}&authId=${authId}`)
  },
)

router.get('/logout', (req, res) => {
  res.clearCookie(ACCESS_TOKEN_COOKIE.name, ACCESS_TOKEN_COOKIE.options)
  res.clearCookie(CSRF_COOKIE.name, CSRF_COOKIE.options)
  return res.json({ logout: true })
})

export default router
