import request from 'supertest'
import { INestApplication } from '@nestjs/common'
import { setup } from '../../../../../../test/setup'
import { Application } from '../../models/application.model'
import { applicationResponse } from '../testHelpers'

describe('getApplication', () => {
  let app: INestApplication
  beforeAll(async () => {
    // create the nestjs test app
    app = await setup()
  })

  it(`GET /v1/applications/:applicationID should return an application`, async () => {
    const response: { body: Application[] } = await request(app.getHttpServer())
      .get('/v1/applications/a353d810-15eb-442f-b481-3eacba289e1a')
      .send()
      .expect(200)

    expect(response.body).toMatchObject(applicationResponse)
  })
})
