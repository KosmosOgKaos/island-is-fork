/**
 * We keep this client framework agnostic to be able to use it for all communications regardless of stack
 * Never the less there already exists a client covering this case we would integrate this fetch with the existing client under normal circumstances
 * This client serves a demonstration client of how we work with external services
 * Ideally this would use X-road to communicate securely with external organization services
 */

import {
  Configuration,
  DefaultApi as UnemploymentRegistryApi,
} from '../../gen/fetch'

export interface UnemploymentRegistryClientConfig {
  url: string
}

export interface UnemploymentRegistryResponse {
  success: boolean
}

export interface UnemploymentRegistryInput {
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

export class UnemploymentRegistryClient {
  private unemploymentRegistryApi: UnemploymentRegistryApi
  constructor(private readonly options: UnemploymentRegistryClientConfig) {
    this.unemploymentRegistryApi = new UnemploymentRegistryApi(
      new Configuration({
        fetchApi: fetch,
        basePath: this.options.url,
      }),
    )
  }

  async submitApplication(
    application: UnemploymentRegistryInput,
  ): Promise<UnemploymentRegistryResponse> {
    // const response = await this.unemploymentRegistryApi.unemploymentBenefitsControllerFindPerson()
    console.log('Submitting', application)
    // TODO: Make request to unemployment service here
    return {
      success: true,
    }
  }
}
