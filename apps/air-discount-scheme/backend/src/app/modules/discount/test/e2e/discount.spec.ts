import { setup } from '../../../../../../test/setup'
import request from 'supertest'
import { INestApplication, CACHE_MANAGER } from '@nestjs/common'
import {
  NationalRegistryService,
  NationalRegistryUser,
} from '../../../nationalRegistry'

let app: INestApplication
let cacheManager: CacheManager
let nationalRegistryService: NationalRegistryService
const user: NationalRegistryUser = {
  nationalId: '1234567890',
  firstName: 'Jón',
  gender: 'kk',
  lastName: 'Jónsson',
  middleName: 'Gunnar',
  address: 'Bessastaðir 1',
  postalcode: 900,
  city: 'Vestmannaeyjar',
}

beforeAll(async () => {
  app = await setup()
  cacheManager = app.get<CacheManager>(CACHE_MANAGER)
  cacheManager.ttl = () => Promise.resolve('')
  nationalRegistryService = app.get<NationalRegistryService>(
    NationalRegistryService,
  )
  jest
    .spyOn(nationalRegistryService, 'getUser')
    .mockImplementation(() => Promise.resolve(user))

  Date.now = jest.fn(() => 1597760782018)
})

describe('Create DiscountCode', () => {
  it(`POST /api/private/users/:nationalId/discounts should return data`, async () => {
    const nationalId = '1326487905'
    const spy = jest.spyOn(cacheManager, 'set')
    const response = await request(app.getHttpServer())
      .post(`/api/private/users/${nationalId}/discounts`)
      .expect(201)

    expect(response.body).toEqual({
      connectionDiscountCodes: [],
      discountCode: expect.any(String),
      expiresIn: 86400,
      nationalId,
    })
    expect(spy).toHaveBeenCalled()
  })
})
