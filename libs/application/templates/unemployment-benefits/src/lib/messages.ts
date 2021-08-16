import { defineMessages } from 'react-intl'

export const m = defineMessages({
  conditionsSection: {
    id: 'example.application:conditions.section',
    defaultMessage: 'Skilyrði',
    description: 'Some description',
  },
  institutionName: {
    id: 'example.application.institution',
    defaultMessage: 'Institution reference',
    description: `Institution's name`,
  },
  name: {
    id: 'example.application:name',
    defaultMessage: 'Nafn',
    description: `Application's name`,
  },
  draftTitle: {
    id: 'example.application:draft.title',
    defaultMessage: 'Drög',
    description: 'First state title',
  },
  draftDescription: {
    id: 'example.application:draft.description',
    defaultMessage: 'Notendur hafa ekkert að gera á þessu stigi',
    description: 'Description of the state',
  },
  introSection: {
    id: 'example.application:intro.section',
    defaultMessage: 'Upplýsingar',
    description: 'Some description',
  },
  introField: {
    id: 'example.application:intro.field',
    defaultMessage: 'Velkomin(n)',
    description: 'Some description',
  },
  introIntroduction: {
    id: 'example.application:intro.introduction',
    defaultMessage: 'Staðfesta persónu upplýsingar',
    description: 'Some description',
  },
  about: {
    id: 'example.application:about',
    defaultMessage: 'Um þig',
    description: 'Some description',
  },
  personName: {
    id: 'example.application:person.name',
    defaultMessage: 'Nafn',
    description: 'Some description',
  },
  nationalId: {
    id: 'example.application:person.nationalId',
    defaultMessage: 'Kennitala',
    description: 'Some description',
  },
  partnerId: {
    id: 'example.application:person.partnerId',
    defaultMessage: 'Kennitala Maka',
    description: 'Some description',
  },
  childId: {
    id: 'example.application:person.childId',
    defaultMessage: 'Kennitala Barns',
    description: 'Some description',
  },
  address: {
    id: 'example.application:person.address',
    defaultMessage: 'Heimilisfang',
    description: 'Some description',
  },
  email: {
    id: 'example.application:person.email',
    defaultMessage: 'Netfang',
    description: 'Some description',
  },
  phoneNumber: {
    id: 'example.application:person.phoneNumber',
    defaultMessage: 'Símanúmer',
    description: 'Some description',
  },
  career: {
    id: 'example.application:career',
    defaultMessage: 'Starfsferill',
    description: 'Some description',
  },
  history: {
    id: 'example.application:history',
    defaultMessage: 'Hvar hefur þú unnið áður?',
    description: 'Some description',
  },
  careerHistory: {
    id: 'example.application:careerHistory',
    defaultMessage: 'Hefurðu unnið yfir höfuð einhvern tímann áður?',
    description: 'Some description',
  },
  careerHistoryCompanies: {
    id: 'example.application:careerHistoryCompanies',
    defaultMessage: 'Hefurðu unnið fyrir eftirfarandi aðila?',
    description: 'Some description',
  },
  future: {
    id: 'example.application:future',
    defaultMessage: 'Hvar langar þig að vinna?',
    description: 'Some description',
  },
  dreamJob: {
    id: 'example.application:dreamJob',
    defaultMessage: 'Einhver draumavinnustaður?',
    description: 'Some description',
  },
  yesOptionLabel: {
    id: 'example.application:yes.option.label',
    defaultMessage: 'Já',
    description: 'Some description',
  },
  noOptionLabel: {
    id: 'example.application:no.option.label',
    defaultMessage: 'Nei',
    description: 'Some description',
  },
  governmentOptionLabel: {
    id: 'example.application:government.option.label',
    defaultMessage: 'The government',
    description: 'Some description',
  },
  outroMessage: {
    id: 'example.application:outro.message',
    defaultMessage:
      'Your application #{id} is now in review. The ID of the application is returned by the createApplication API action and read from application.externalData',
    description: 'Some description',
  },
  dataSchemePhoneNumber: {
    id: 'example.application:dataSchema.phoneNumber',
    defaultMessage: 'Símanúmerið þarf að vera gilt.',
    description: 'Error message when phone number is invalid.',
  },
  dataSchemeNationalId: {
    id: 'example.application:dataSchema.national.id',
    defaultMessage: 'Kennitala þarf að vera gild.',
    description: 'Error message when the kennitala is invalid.',
  },
  paymentInformationSubSection: {
    id: 'pl.application:payment.information.subsection',
    defaultMessage: 'Greiðsluupplýsingar',
    description: 'Payment Information',
  },
  paymentInformationName: {
    id: 'pl.application:payment.information.name',
    defaultMessage: 'Er allt eins og það á að vera?',
    description: 'Is everything how it is supposed to be?',
  },
  paymentInformationBank: {
    id: 'pl.application:payment.information.bank',
    defaultMessage: 'Banki',
    description: 'Bank',
  },
  pensionFund: {
    id: 'pl.application:payment.information.pensionfund',
    defaultMessage: 'Lífeyrissjóður',
    description: 'Pension fund (optional)',
  },
  union: {
    id: 'pl.application:payment.information.union',
    defaultMessage: 'Stéttarfélag (valfrjálst)',
    description: 'Union (optional)',
  },
  privatePensionFund: {
    id: 'pl.application:payment.information.privatePensionFund',
    defaultMessage: 'Séreignarsjóður',
    description: 'Private pension fund',
  },
  privatePensionFundName: {
    id: 'pl.application:payment.information.privatePensionFund.name',
    defaultMessage: 'Óskarðu eftir því að greiða í séreignarsjóð?',
    description: 'Do you wish to pay to a private pension fund?',
  },
  privatePensionFundRatio: {
    id: 'pl.application:payment.information.privatePensionFund.ratio',
    defaultMessage: 'Séreignarsjóður %',
    description: 'Private pension fund %',
  },
  privatePensionFundDescription: {
    id: 'pl.application:payment.information.privatePensionFund.description',
    defaultMessage:
      'Vinsamlegast athugaðu að Fæðingarorlofssjóður greiðir ekki mótframlag í séreignarsjóð.',
    description:
      'Note that Department of Parental Leave does not pay counter-contribution.',
  },
})
