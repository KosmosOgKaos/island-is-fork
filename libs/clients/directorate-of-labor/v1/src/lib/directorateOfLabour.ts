/**
 * We keep this client framework agnostic to be able to use it for all communications regardless of stack
 * Never the less there already exists a client covering this case we would integrate this fetch with the existing client under normal circumstances
 * This client serves a demonstration client of how we work with external services
 * Ideally this would use X-road to communicate securely with external organization services
 */

import {
  Configuration,
  DefaultApi as DirectorateOfLaborApi,
} from '../../gen/fetch'

export interface DirectorateOfLaborClientConfig {
  url: string
}

export interface DirectorateOfLaborResponse {
  success: boolean
}

export interface DirectorateOfLaborInput {
  secretWord: string
  getPaperCopy: boolean
  employmentStatus: string
  employmentRatio: number
  bank: string
  pensionFund: string
  union: string
  privatePensionFund: string
  pensionFundPercentage: number
  personalTaxCreditRatio: number
  monthlyIncome: number
  insurancePayments: number
  onParentalLeave: boolean
}

export class DirectorateOfLaborClient {
  private directorateOfLabourApi: DirectorateOfLaborApi
  constructor(private readonly options: DirectorateOfLaborClientConfig) {
    this.directorateOfLabourApi = new DirectorateOfLaborApi(
      new Configuration({
        fetchApi: fetch,
        basePath: this.options.url,
      }),
    )
  }

  async submitApplication(
    nationalId: string,
    application: DirectorateOfLaborInput,
  ): Promise<DirectorateOfLaborResponse> {
    // send application to external service
    await this.directorateOfLabourApi.applicationControllerCreateApplication({
      createApplicationDto: {
        bank: application.bank,
        employmentRatio: application.employmentRatio,
        employmentStatus: application.employmentStatus,
        insurancePayments: application.insurancePayments,
        getPaperCopy: application.getPaperCopy,
        monthlyIncome: application.monthlyIncome,
        onParentalLeave: application.onParentalLeave,
        pensionFund: application.pensionFund,
        pensionFundPercentage: application.pensionFundPercentage,
        personalTaxCreditRatio: application.personalTaxCreditRatio,
        privatePensionFund: application.privatePensionFund,
        secretWord: application.secretWord,
        union: application.secretWord,
        nationalId,
        //constants
        personalTaxCreditMonthlyAmount: 1337,
        pensionPayments: 1337,
        incomeStepOne: 38,
        incomeStepTwo: 52,
      },
    })

    return {
      success: true,
    }
  }
}
