import { dedent } from 'ts-dedent'
import get from 'lodash/get'

import { EmailTemplateGenerator } from '../../../../types'

export const generateApplicationApprovedEmail: EmailTemplateGenerator = (
  props,
) => {
  const {
    application,
    options: { email },
  } = props

  const applicantEmail = get(application.answers, 'employment.employerEmail')
  console.log('\n\n\n APPLICANT EMAIL: ' + applicantEmail + '\n\n\n')
  console.log('\n\n\n  EMAIL: ' + email.sender + '\n\n\n')
  console.log('\n\n\n  EMAIL: ' + email.address + '\n\n\n')

  const subject = 'Umsókn um atvinnuleysisbætur'
  const body = dedent(`
        vinsamlegast staðfestið atvinnuleysis umsókn inná .....

        <b>kv: </b>${email}


      `)

  return {
    from: {
      name: email.sender,
      address: email.address,
    },
    to: [
      {
        name: '',
        address: applicantEmail as string,
      },
    ],
    subject,
    html: `<p>${body
      .split('')
      .map((c) => (c === '\n' ? `<br />\n` : c))
      .join('')}</p>`,
  }
}
