import request from 'supertest'
import { INestApplication } from '@nestjs/common'
import { setup } from '../../../../../../test/setup'
import { PensionFund } from '../../models/pensionFund.model'

describe('getAllPensionFunds', () => {
  let app: INestApplication
  beforeAll(async () => {
    // create the nestjs test app
    app = await setup()
  })

  it(`GET /v1/pension-funds should return a list of pension funds`, async () => {
    const response: { body: PensionFund[] } = await request(app.getHttpServer())
      .get('/v1/pension-funds')
      .send()
      .expect(200)

    expect(response.body.length).toBeGreaterThanOrEqual(2)
  })
})
