import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import jsonp from 'jsonp'
import { Box, NewsletterSignup } from '@island.is/island-ui/core'
import { isValidEmail } from '@island.is/web/utils/isValidEmail'
import { GetNamespaceQuery } from '@island.is/web/graphql/schema'
import { useNamespace } from '@island.is/web/hooks'

type FormState = {
  type: 'default' | 'error' | 'success'
  message: string
}

interface FormProps {
  email: string
}

interface MailingListSignupProps {
  namespace: GetNamespaceQuery['getNamespace']
  id: string
  title: string
  description: string
  inputLabel: string
  placeholder?: string
  buttonText: string
  mailingListUrl: string
}

export const MailingListSignup: React.FC<MailingListSignupProps> = ({
  namespace,
  id,
  title,
  description,
  inputLabel,
  placeholder,
  buttonText,
  mailingListUrl,
}) => {
  // Validate Mailing List Url contains email replacement token
  // TODO: What is the proper way of logging such validation errors?
  const mailingListUrlEmailReplacementToken = '{{EMAIL}}'
  if (!mailingListUrl.includes(mailingListUrlEmailReplacementToken)) {
    console.warn(
      `Mailing list URL must include email replacement token "${mailingListUrlEmailReplacementToken}"`,
    )
  }

  const n = useNamespace(namespace)
  const [status, setStatus] = useState<FormState>({
    type: 'default',
    message: '',
  })

  const handleSubmit = ({ email }: FormProps) => {
    if (isValidEmail.test(email)) {
      // Submit the valid email address.
      const url = formatMailingSignupUrl(email)
      jsonp(
        url,
        {
          param: 'c',
        },
        (err: Error, data: any) => {
          if (err) {
            setStatus({
              type: 'error',
              message: err.message,
            })
          } else if (data.result !== 'success') {
            setStatus({
              type: 'error',
              message: data.msg,
            })
          } else {
            const successMessage: string = n(
              'formSuccess',
              '???? ??arft a?? fara ?? p??sth??lfi?? ??itt og sam??ykkja ums??knina. Takk fyrir.',
            )
            setStatus({
              type: 'success',
              message: successMessage,
            })
          }
        },
      )
    } else {
      // Email address is not valid.
      setStatus({
        ...status,
        type: 'error',
        message: n('formInvalidEmail', '??etta er ??gilt netfang.'),
      })
    }
  }

  /**
   * Initialize Formik
   */
  const formikInitialValues: FormProps = { email: '' }
  const formik = useFormik({
    initialValues: formikInitialValues,
    onSubmit: handleSubmit,
  })

  useEffect(() => {
    if (status.type === 'error' && formik.values.email === '') {
      // Reset the form to default state when the User clears the
      // email input field after getting an error.
      setStatus({
        ...status,
        type: 'default',
        message: '',
      })
    }
  }, [status.type, formik.values.email])

  /**
   * Formats the Mailing list signup URL with the given email.
   *
   * @param email A valid email address.
   * @returns A URL to call to subsribe the given email address to the Mailing List.
   */
  const formatMailingSignupUrl = (email: string) => {
    const encodedEmail = encodeURIComponent(email)
    return mailingListUrl.replace(
      mailingListUrlEmailReplacementToken,
      encodedEmail,
    )
  }

  /**
   * Parses error messages to make them more user friendly.
   *
   * @param message An error message.
   * @returns A more user friendly version of the given error message.
   */
  const parseErrorMessage = (message: string) => {
    if (!message) {
      return
    }
    const msg = message.toLowerCase()

    if (
      msg.includes('is already subscribed') ||
      msg.includes('er n?? ??egar skr????ur')
    ) {
      return n('formEmailAlreadyRegistered', '??etta netfang er ??egar ?? skr??.')
    }

    if (msg.includes('invalid email') || msg.includes('??gilt netfang')) {
      return n('formInvalidEmail', '??etta er ??gilt netfang.')
    }

    // TODO: Is this the proper way to log unexpected cases of error messages?
    console.warn(message)
    return n('formEmailUnknownError', '????ekkt villa.')
  }

  return (
    <Box background="blue100" paddingX={[2, 2, 8]} paddingY={[2, 2, 6]}>
      <NewsletterSignup
        id={id}
        name="email"
        heading={title}
        text={description}
        placeholder={placeholder}
        label={inputLabel}
        buttonText={buttonText}
        variant="blue"
        onChange={formik.handleChange}
        onSubmit={formik.handleSubmit}
        value={formik.values.email}
        errorMessage={parseErrorMessage(
          status.type == 'error' ? status.message : '',
        )}
        successTitle={n('formSuccessTitle', 'Skr??ning t??kst')}
        successMessage={status.type == 'success' ? status.message : ''}
        state={status.type}
      />
    </Box>
  )
}
