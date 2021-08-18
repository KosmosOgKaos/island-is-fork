import request from 'supertest'
import { INestApplication } from '@nestjs/common'
import { setup } from '../../../../../../test/setup'
import { Union } from '../../models/union.model'

describe('getAllUnions', () => {
  let app: INestApplication
  beforeAll(async () => {
    // create the nestjs test app
    app = await setup()
  })

  it(`GET /v1/unions should return a list of unions`, async () => {
    const response: { body: Union[] } = await request(app.getHttpServer())
      .get('/v1/unions')
      .send()
      .expect(200)

    expect(response.body.length).toBeGreaterThanOrEqual(2)
  })
})
