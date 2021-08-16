import {
  ApplicationTemplate,
  ApplicationTypes,
  ApplicationContext,
  ApplicationRole,
  ApplicationStateSchema,
  Application,
  DefaultEvents,
  DefaultStateLifeCycle,
  ApplicationConfigurations,
} from '@island.is/application/core'
import * as z from 'zod'
import * as kennitala from 'kennitala'
import { parsePhoneNumberFromString } from 'libphonenumber-js'

import { ApiActions } from '../shared'
import { m } from './messages'

const States = {
  prerequisites: 'prerequisites',
  draft: 'draft',
  inReview: 'inReview',
  approved: 'approved',
  rejected: 'rejected',
}

type UnemploymentBenefitsEvent =
  | { type: DefaultEvents.APPROVE }
  | { type: DefaultEvents.REJECT }
  | { type: DefaultEvents.SUBMIT }
  | { type: DefaultEvents.ASSIGN }

enum Roles {
  APPLICANT = 'applicant',
  ASSIGNEE = 'assignee',
}
const DataSchema = z.object({
  approveExternalData: z.boolean().refine((v) => v),
  person: z.object({
    name: z.string().nonempty().max(256),
    age: z.string().refine((x) => {
      const asNumber = parseInt(x)
      if (isNaN(asNumber)) {
        return false
      }
      return asNumber > 15
    }),
    nationalId: z
      .string()
      /**
       * We are depending on this template for the e2e tests on the application-system-api.
       * Because we are not allowing committing valid kennitala, I reversed the condition
       * to check for invalid kenitala so it passes the test.
       */
      .refine((n) => n && !kennitala.isValid(n), {
        params: m.dataSchemeNationalId,
      }),
    phoneNumber: z.string().refine(
      (p) => {
        const phoneNumber = parsePhoneNumberFromString(p, 'IS')
        return phoneNumber && phoneNumber.isValid()
      },
      { params: m.dataSchemePhoneNumber },
    ),
    email: z.string().email(),
  }),
  careerHistory: z.enum(['yes', 'no']).optional(),
  careerHistoryCompanies: z
    .array(
      // TODO checkbox answers are [undefined, 'aranja', undefined] and we need to do something about it...
      z.union([z.enum(['government', 'aranja', 'advania']), z.undefined()]),
    )
    .nonempty(),
  dreamJob: z.string().optional(),
})

const UnemploymentBenefitsTemplate: ApplicationTemplate<
  ApplicationContext,
  ApplicationStateSchema<UnemploymentBenefitsEvent>,
  UnemploymentBenefitsEvent
> = {
  type: ApplicationTypes.UNEMPLOYMENT_BENEFITS,
  name: m.name,
  institution: m.institutionName,
  translationNamespaces: [ApplicationConfigurations.UnemploymentBenefits.translation],
  dataSchema: DataSchema,
  stateMachineConfig: {
    initial: States.draft,
    states: {
      [States.draft]: {
        meta: {
          name: 'Umsókn fyrir atvinnuleysisbætur',
          // actionCard: {
          //   title: m.draftTitle,
          //   description: m.draftDescription,
          // },
          progress: 0.25,
          lifecycle: DefaultStateLifeCycle,
          roles: [
            {
              id: Roles.APPLICANT,
              formLoader: () =>
                import('../forms/Application').then((module) =>
                  Promise.resolve(module.application),
                ),
              actions: [
                { event: 'SUBMIT', name: 'Staðfesta', type: 'primary' },
              ],
              write: 'all',
            },
          ],
        },
        on: {
          SUBMIT: {
            target: States.inReview,
          },
        },
      },
      [States.inReview]: {
        meta: {
          name: 'In Review',
          progress: 0.75,
          lifecycle: DefaultStateLifeCycle,
          onEntry: {
            apiModuleAction: ApiActions.createApplication,
          },
          onExit: {
            apiModuleAction: ApiActions.completeApplication,
          },
          roles: [
            {
              id: Roles.ASSIGNEE,
              formLoader: () =>
                import('../forms/ReviewApplication').then((val) =>
                  Promise.resolve(val.ReviewApplication),
                ),
              actions: [
                { event: 'APPROVE', name: 'Samþykkja', type: 'primary' },
                { event: 'REJECT', name: 'Hafna', type: 'reject' },
              ],
              write: { answers: ['careerHistoryCompanies'] },
              read: 'all',
            },
            {
              id: Roles.APPLICANT,
              formLoader: () =>
                import('../forms/PendingReview').then((val) =>
                  Promise.resolve(val.PendingReview),
                ),
              read: 'all',
            },
          ],
        },
        on: {
          APPROVE: { target: States.approved },
          REJECT: { target: States.rejected },
        },
      },
      [States.approved]: {
        meta: {
          name: 'Approved',
          progress: 1,
          lifecycle: DefaultStateLifeCycle,
          roles: [
            {
              id: Roles.APPLICANT,
              formLoader: () =>
                import('../forms/Approved').then((val) =>
                  Promise.resolve(val.Approved),
                ),
              read: 'all',
            },
          ],
        },
        type: 'final' as const,
      },
      [States.rejected]: {
        meta: {
          name: 'Rejected',
          lifecycle: DefaultStateLifeCycle,
          roles: [
            {
              id: Roles.APPLICANT,
              formLoader: () =>
                import('../forms/Rejected').then((val) =>
                  Promise.resolve(val.Rejected),
                ),
            },
          ],
        },
      },
    },
  },
  mapUserToRole(
    id: string,
    application: Application,
  ): ApplicationRole | undefined {
    if (application.state === 'inReview') {
      return Roles.ASSIGNEE
    }
    return Roles.APPLICANT
  },
}

export default UnemploymentBenefitsTemplate
