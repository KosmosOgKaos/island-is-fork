import {
  buildForm,
  buildCustomField,
  Form,
  FormModes,
} from '@island.is/application/core'
import { m } from '../lib/messages'
import Logo from '../assets/Logo'

export const LetterApplicationApprovedOverview: Form = buildForm({
  id: 'LetterApplicationApproved',
  title: m.partyLetterApprovedOverview.title,
  logo: Logo,
  mode: FormModes.APPROVED,
  children: [
    buildCustomField({
      title: m.ministryOfJustice.title,
      description: m.ministryOfJustice.description,
      id: 'ministryOverview',
      component: 'MinistryOfJusticeOverview',
    }),
  ],
})
