import request from 'supertest'
import { INestApplication } from '@nestjs/common'
import { setup } from '../../../../../../test/setup'
import { PensionFund } from '../../models/pensionFund.model'
import { pensionFundResponse } from '../testHelpers'

describe('createPensionFund', () => {
  let app: INestApplication
  beforeAll(async () => {
    // create the nestjs test app
    app = await setup()
  })

  it(`POST /v1/pension-funds should create a pension fund`, async () => {
    const response: { body: PensionFund[] } = await request(app.getHttpServer())
      .post('/v1/pension-funds')
      .send({
        name: 'Stapi',
      })
      .expect(200)

    expect(response.body).toMatchObject(pensionFundResponse)
  })
})
