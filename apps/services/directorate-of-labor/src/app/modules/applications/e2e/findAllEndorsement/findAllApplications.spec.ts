import request from 'supertest'
import { INestApplication } from '@nestjs/common'
import { setup } from '../../../../../../test/setup'
import { Application } from '../../models/application.model'

describe('findAllEndorsement', () => {
  let app: INestApplication
  beforeAll(async () => {
    // create the nestjs test app
    app = await setup()
  })

  it(`GET /v1/applications should return a list of applications`, async () => {
    const response: { body: Application[] } = await request(app.getHttpServer())
      .get('/v1/applications')
      .send()
      .expect(200)

    expect(response.body.length).toBeGreaterThanOrEqual(2)
  })
})
