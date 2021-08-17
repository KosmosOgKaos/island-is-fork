import {
  BasicDataProvider,
  Application,
  SuccessfulDataProviderResult,
} from '@island.is/application/core'

interface NationalRegistryProviderData {
  nationalId: string
  name: string
  phoneNumber: string
  email: string
  address: string
  partnerNationalId: string
  childrenNationalId: string[]
}

type GetPersonResponse = {
  getPerson: NationalRegistryProviderData
}

export class NationalRegistryDataProvider extends BasicDataProvider {
  type = 'NationalRegistryDataProvider'

  async provide(
    application: Application,
  ): Promise<NationalRegistryProviderData> {
    console.log('About to fetch data!!!!!')
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
    data: NationalRegistryProviderData,
  ): SuccessfulDataProviderResult {
    return {
      date: new Date(),
      data,
      status: 'success',
    }
  }
}
