import { LOGGER_PROVIDER } from '@island.is/logging'
import { Inject, Injectable } from '@nestjs/common'
import { TemplateApiModuleActionProps } from '../../../types'
import type { Logger } from '@island.is/logging'
import type { UnemploymentBenefitsSchema } from '@island.is/application/templates/unemployment-benefits'
import { SharedTemplateApiService } from '../../shared'
import {
  MutationUnemploymentSubmitApplicationArgs,
  SubmitApplicationResponse,
} from './types/schema'
// import {
//   generateApplicationApprovedEmail,
// } from './emailGenerators'

const SUBMIT_UNEMPLOYMENT_APPLICATION_QUERY = `
mutation unemploymentSubmitApplication($input: SubmitApplicationDto!) {
  unemploymentSubmitApplication(input: $input) {
    success
  }
}
`
interface ErrorResponse {
  errors: {
    message: string
  }
}

type CreateApplicationResponse =
  | {
      data: {
        unemploymentSubmitApplication: SubmitApplicationResponse
      }
    }
  | ErrorResponse

@Injectable()
export class UnemploymentBenefitsService {
  constructor(
    @Inject(LOGGER_PROVIDER) private logger: Logger,
    private readonly sharedTemplateAPIService: SharedTemplateApiService,
  ) {}
  async createApplication({
    application,
    authorization,
  }: TemplateApiModuleActionProps) {
    const unemploymentAnswers = (application.answers as unknown) as UnemploymentBenefitsSchema

    const noResponseText = 'Not specified'
    const unemploymentApplicationResponse: CreateApplicationResponse = await this.sharedTemplateAPIService
      .makeGraphqlQuery<MutationUnemploymentSubmitApplicationArgs>(
        authorization,
        SUBMIT_UNEMPLOYMENT_APPLICATION_QUERY,
        {
          input: {
            secretWord: unemploymentAnswers.secretWord ?? noResponseText,
            getPaperCopy: unemploymentAnswers.getPaperCopy === 'yes',
            employmentStatus:
              unemploymentAnswers.employment?.employmentStatus ??
              noResponseText,
            employmentRatio: Number(
              unemploymentAnswers.employment?.employmentRatio ?? 0,
            ),
            bank: unemploymentAnswers.payments.bank,
            pensionFund:
              unemploymentAnswers.payments.pensionFund ?? noResponseText,
            union: unemploymentAnswers.payments.union ?? noResponseText,
            privatePensionFund:
              unemploymentAnswers.payments.privatePensionFund ?? noResponseText,
            pensionFundPercentage: Number(
              unemploymentAnswers.payments.pensionFundPercentage ?? 0,
            ),
            personalTaxCreditRatio: Number(
              unemploymentAnswers.personalTaxCreditRatio ?? 0,
            ),
            monthlyIncome: Number(unemploymentAnswers.monthlyIncome ?? 0),
            insurancePayments: Number(
              unemploymentAnswers.insurancePayments ?? 0,
            ),
            onParentalLeave: unemploymentAnswers.onParentalLeave === 'yes',
          },
        },
      )
      .then((response) => response.json())

    if ('errors' in unemploymentApplicationResponse) {
      throw new Error('Failed to create unemployment application')
    }

    // await this.sharedTemplateAPIService.sendEmail(
    //   generateApplicationApprovedEmail,
    //   application,
    // )

    return {
      success: true,
    }
  }
}
