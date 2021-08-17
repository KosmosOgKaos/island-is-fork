/**
 * We keep this client framework agnostic to be able to use it for all communications
 * Never the less there already exists a client covering this case we would integrate this fetch with the existing client under normal circumstances
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
  name: string
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
    const response = await this.nationalRegistryApi.peopleControllerFindPerson({
      nationalId,
    })

    return {
      name: response.fullName,
      nationalId: response.nationalId,
      phoneNumber: response.phone,
      email: response.email,
      address: response.address,
      partnerNationalId: response.partnerId ?? '',
      childrenNationalId: [],
    }
  }
}
