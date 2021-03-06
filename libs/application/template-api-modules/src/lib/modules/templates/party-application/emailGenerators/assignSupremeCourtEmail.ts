import { dedent } from 'ts-dedent'
import { AssignmentEmailTemplateGenerator } from '../../../../types'
import { EndorsementListTagsEnum } from '../gen/fetch'

type Constituency = Extract<
  EndorsementListTagsEnum,
  | EndorsementListTagsEnum.partyApplicationNordausturkjordaemi2021
  | EndorsementListTagsEnum.partyApplicationNordvesturkjordaemi2021
  | EndorsementListTagsEnum.partyApplicationReykjavikurkjordaemiNordur2021
  | EndorsementListTagsEnum.partyApplicationReykjavikurkjordaemiSudur2021
  | EndorsementListTagsEnum.partyApplicationSudurkjordaemi2021
  | EndorsementListTagsEnum.partyApplicationSudvesturkjordaemi2021
>
export type GenerateAssignSupremeCourtApplicationEmailOptions = Record<
  | 'partyApplicationRvkSouth'
  | 'partyApplicationRvkNorth'
  | 'partyApplicationSouthWest'
  | 'partyApplicationNorthWest'
  | 'partyApplicationNorth'
  | 'partyApplicationSouth',
  string
>
export const generateAssignSupremeCourtApplicationEmail = (
  adminEmails: GenerateAssignSupremeCourtApplicationEmailOptions,
): AssignmentEmailTemplateGenerator => (props, assignLink) => {
  const {
    application,
    options: { email },
  } = props

  const constituencyEmailMap = {
    [EndorsementListTagsEnum.partyApplicationNordausturkjordaemi2021]:
      adminEmails.partyApplicationNorth,
    [EndorsementListTagsEnum.partyApplicationNordvesturkjordaemi2021]:
      adminEmails.partyApplicationNorthWest,
    [EndorsementListTagsEnum.partyApplicationReykjavikurkjordaemiNordur2021]:
      adminEmails.partyApplicationRvkNorth,
    [EndorsementListTagsEnum.partyApplicationReykjavikurkjordaemiSudur2021]:
      adminEmails.partyApplicationRvkSouth,
    [EndorsementListTagsEnum.partyApplicationSudurkjordaemi2021]:
      adminEmails.partyApplicationSouth,
    [EndorsementListTagsEnum.partyApplicationSudvesturkjordaemi2021]:
      adminEmails.partyApplicationSouthWest,
  }

  const supremeCourtEmail =
    constituencyEmailMap[application.answers.constituency as Constituency]

  const { partyLetter, partyName } = application.externalData
    .partyLetterRegistry?.data as any

  const subject = 'Me??m??li me?? frambo??slista'
  const body = dedent(`
        Me??m??li me?? frambo??slista hefur veri?? skila?? inn fyrir:

        <b>Stj??rnm??lasamt??k:</b> ${partyName}
        <b>Listab??kstafur:</b> ${partyLetter}
        <b>Kj??rd??mi:</b> ${application.answers.constituency}

        Ef ???? ??ttir von ?? ??essum t??lvup??sti ???? getur ???? <a href="${assignLink}" target="_blank">smellt h??r til ??ess a?? fara yfir ums??knina</a>.
        `)

  return {
    from: {
      name: email.sender,
      address: email.address,
    },
    to: [
      {
        name: '',
        address: supremeCourtEmail,
      },
    ],
    subject,
    html: `<p>${body
      .split('')
      .map((c) => (c === '\n' ? `<br />\n` : c))
      .join('')}</p>`,
  }
}
