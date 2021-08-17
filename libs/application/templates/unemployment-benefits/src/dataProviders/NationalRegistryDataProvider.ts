import {
  BasicDataProvider,
  Application,
  SuccessfulDataProviderResult,
} from '@island.is/application/core'
import { NationalRegistryGetPerson } from '../types/schema'

type GetPersonResponse = {
  getPerson: NationalRegistryGetPerson
}

export class NationalRegistryDataProvider extends BasicDataProvider {
  type = 'NationalRegistryDataProvider'

  async provide(application: Application): Promise<NationalRegistryGetPerson> {
    const query = `
      query getPerson {
        getPerson {
          nationalId
          phoneNumber
          name
          email
          address
          partnerNationalId
          childrenNationalId
        }
      }
    `

    const response = await this.useGraphqlGateway<GetPersonResponse>(
      query,
    ).then((res) => res.json())

    // we did not find this person, let the use know
    if (!response.data?.getPerson || 'errors' in response) {
      console.log('response', response)
      throw new Error('Failed to get information from national registry')
    }

    return response.data.getPerson
  }

  onProvideSuccess(
    data: NationalRegistryGetPerson,
  ): SuccessfulDataProviderResult {
    return {
      date: new Date(),
      data,
      status: 'success',
    }
  }
}
