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

  const employerEmail = get(application.answers, 'employment.employerEmail')
  const employerName = get(application.answers, 'employment.employerName')
  const ratio= get(application.answers, 'employment.employmentRatio')
  const start = get(application.answers, 'employment.startDate')
  const end = get(application.answers, 'employment.endDate')
  const applicantName = get(application.answers, 'person.name')

  const subject = 'Umsókn um atvinnuleysisbætur'
  const body = dedent(`
    Sæl-/l 
    Póstur vegna umsóknar um atvinnuleysisbætur.
    Vinsamlegast staðfestið að ${applicantName} hafi starfað hjá ${employerName} á eftirfarandi tímabili ${start} til ${end} í ${ratio} starfshlutfalli.
    Farið er inn á atvinnurekendagátt Vinnumálastofnunar til að stafesta eða hafna erindi.
    Bestu kveðjur,
    Vinnumálastofnun

      `)

  return {
    from: {
      name: email.sender,
      address: email.address,
    },
    to: [
      {
        name: '',
        address: employerEmail as string,
      },
    ],
    subject,
    html: `<p>${body
      .split('')
      .map((c) => (c === '\n' ? `<br />\n` : c))
      .join('')}</p>`,
  }
}
