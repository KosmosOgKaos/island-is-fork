import { LOGGER_PROVIDER } from '@island.is/logging'
import { Inject, Injectable } from '@nestjs/common'
import { TemplateApiModuleActionProps } from '../../../types'
import { GenerateAssignSupremeCourtApplicationEmailOptions } from './emailGenerators'
import type { Logger } from '@island.is/logging'
import type { UnemploymentBenefitsSchema } from '@island.is/application/templates/unemployment-benefits'

export const PARTY_APPLICATION_SERVICE_OPTIONS =
  'PARTY_APPLICATION_SERVICE_OPTIONS'

const CREATE_ENDORSEMENT_LIST_QUERY = `
  mutation EndorsementSystemCreatePartyLetterEndorsementList($input: CreateEndorsementListDto!) {
    endorsementSystemCreateEndorsementList(input: $input) {
      id
    }
  }
`

interface ErrorResponse {
  errors: {
    message: string
  }
}

type EndorsementListResponse =
  | {
      data: {
        endorsementSystemCreateEndorsementList: {
          id: string
        }
      }
    }
  | ErrorResponse

export interface PartyApplicationServiceOptions {
  adminEmails: GenerateAssignSupremeCourtApplicationEmailOptions
}

interface PartyLetterData {
  partyName: string
  partyLetter: string
}

@Injectable()
export class UnemploymentBenefitsService {
  constructor(@Inject(LOGGER_PROVIDER) private logger: Logger) {}
  async createApplication({
    application,
    authorization,
  }: TemplateApiModuleActionProps) {
    const unemploymentAnswers = (application.answers
      ?.data as unknown) as UnemploymentBenefitsSchema

    unemploymentAnswers

    const endorsementList: EndorsementListResponse = await this.sharedTemplateAPIService
      .makeGraphqlQuery(authorization, CREATE_ENDORSEMENT_LIST_QUERY, {
        input: {
          title: partyLetter.partyName,
          description: partyLetter.partyLetter,
          endorsementMeta: ['fullName', 'address', 'signedTags'],
          tags: [application.answers.constituency as EndorsementListTagsEnum],
          validationRules: [
            {
              type: 'minAgeAtDate',
              value: {
                date: '2021-09-25T00:00:00Z',
                age: 18,
              },
            },
            {
              type: 'uniqueWithinTags',
              value: {
                tags: [
                  EndorsementListTagsEnum.partyApplicationNordausturkjordaemi2021,
                  EndorsementListTagsEnum.partyApplicationNordvesturkjordaemi2021,
                  EndorsementListTagsEnum.partyApplicationReykjavikurkjordaemiNordur2021,
                  EndorsementListTagsEnum.partyApplicationReykjavikurkjordaemiSudur2021,
                  EndorsementListTagsEnum.partyApplicationSudurkjordaemi2021,
                  EndorsementListTagsEnum.partyApplicationSudvesturkjordaemi2021,
                ],
              },
            },
          ],
          meta: {
            // to be able to link back to this application
            applicationTypeId: application.typeId,
            applicationId: application.id,
          },
        },
      })
      .then((response) => response.json())

    if ('errors' in endorsementList) {
      throw new Error('Failed to create endorsement list')
    }

    // This gets written to externalData under the key createEndorsementList
    return {
      id: endorsementList.data.endorsementSystemCreateEndorsementList.id,
    }
  }
}
