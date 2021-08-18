import request from 'supertest'
import { INestApplication } from '@nestjs/common'
import { setup } from '../../../../../../test/setup'
import { PensionFund } from '../../models/pensionFund.model'
import { pensionFundResponse } from '../testHelpers'

describe('getPensionFund', () => {
  let app: INestApplication
  beforeAll(async () => {
    // create the nestjs test app
    app = await setup()
  })

  it(`GET /v1/pension-funds/:pensionFundId should return a pension fund`, async () => {
    const response: { body: PensionFund[] } = await request(app.getHttpServer())
      .get('/v1/pension-funds/a353d810-15eb-442f-b481-3eacba289e1a')
      .send()
      .expect(200)

    expect(response.body).toMatchObject(pensionFundResponse)
  })
})
