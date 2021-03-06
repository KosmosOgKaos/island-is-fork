import { isObject } from 'util'
import { Locale } from '@island.is/shared/types'

import { Translation } from '../i18n/locales'

const locales = {} as any

export const getLocale = async (locale: Locale): Promise<Translation> => {
  if (!locales[locale]) {
    locales[locale] = await import(`../i18n/locales/${locale}.json`)
  }
  return locales[locale]
}

export const getRoutefromLocale = async (
  path: string,
  from: Locale,
  to: Locale,
) => {
  const fromLocale = await getLocale(from)
  const toLocale = await getLocale(to)
  if (!fromLocale && !toLocale) {
    return ''
  }
  const findPath = (baseObj: any, returnObj: any, path: string): string => {
    return Object.keys(baseObj).reduce((acc, key) => {
      if (baseObj[key] === path) {
        return returnObj[key]
      }
      if (isObject(baseObj[key])) {
        const nestedPath = findPath(baseObj[key], returnObj[key], path)
        if (nestedPath) {
          return nestedPath
        }
      }
      return acc
    }, '')
  }
  return findPath(fromLocale.routes, toLocale.routes, path)
}

export const getBaseUrl = () => {
  const isLocalhost = window.location.origin.includes('localhost')
  const isDev = window.location.origin.includes('dev01.devland.is')
  const isStaging = window.location.origin.includes('staging01.devland.is')

  if (isStaging) {
    return 'https://beta.staging01.devland.is'
  } else if (isDev || isLocalhost) {
    return 'https://beta.dev01.devland.is'
  } else {
    return 'https://island.is'
  }
}
