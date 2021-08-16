/**
 * We keep this client framework agnostic to be able to use it for all communications regardless of stack
 * Never the less there already exists a client covering this case
 * This client serves a demonstration client of how we work with external services
 * Ideally this would use X-road to communicate securely with external organization services
 */

import {
  Configuration,
  DefaultApi as NationalRegistryApi,
} from '../../gen/fetch'

export interface NationalRegistryClientConfig {
  url: string
}

export interface NationalRegistryResponse {
  name: 'Mock user'
  nationalId: string
  phoneNumber: string
  email: string
  address: string
  partnerNationalId: string
  childrenNationalId: string[]
}

export class NationalRegistryClient {
  private nationalRegistryApi: NationalRegistryApi
  constructor(private readonly options: NationalRegistryClientConfig) {
    this.nationalRegistryApi = new NationalRegistryApi(
      new Configuration({
        fetchApi: fetch,
        basePath: this.options.url,
      }),
    )
  }

  async getPerson(nationalId: string): Promise<NationalRegistryResponse> {
    // const response = await this.nationalRegistryApi.unemploymentBenefitsControllerFindPerson()

    // TODO: Make request to nationalRegistry service here
    return {
      name: 'Mock user',
      nationalId: nationalId,
      phoneNumber: '123-1337',
      email: 'mockuser@example.com',
      address: 'Mock Address 23',
      partnerNationalId: '0000000000',
      childrenNationalId: ['1111111111', '2222222222'],
    }
  }
}
