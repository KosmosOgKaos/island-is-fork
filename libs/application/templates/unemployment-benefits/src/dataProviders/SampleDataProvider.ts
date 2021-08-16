import {
  BasicDataProvider,
  Application,
  SuccessfulDataProviderResult,
} from '@island.is/application/core'

interface SampleProviderData {
  nationalId: String
  fullName: String
  address: String
  email: String
  phone: String
  children: String
  partner: string
  value: string
}

export class SampleDataProvider extends BasicDataProvider {
  type = 'SampleDataProvider'

  async provide(application: Application): Promise<unknown> {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const data: SampleProviderData = {
      nationalId: '010130-2989',
      fullName: 'Gervimaður Ameríka',
      address: 'Nónsstígur 5',
      email: 'vg@island.is',
      phone: '4265501',
      children: 'Gervibarn (7 ára)',
      partner: '010130-4929',
      value: 'TEST'
    }

    return Promise.resolve(data)
  }

  onProvideSuccess(data: SampleProviderData): SuccessfulDataProviderResult {
    return {
      date: new Date(),
      data,
      status: 'success',
    }
  }
}
