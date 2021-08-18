import request from 'supertest'
import { INestApplication } from '@nestjs/common'
import { setup } from '../../../../../../test/setup'
import { Application } from '../../models/application.model'
import { applicationResponse } from '../testHelpers'

describe('updateApplication', () => {
  let app: INestApplication
  beforeAll(async () => {
    // create the nestjs test app
    app = await setup()
  })

  it(`PUT /v1/applications/:applicationId should update the application`, async () => {
    const response: { body: Application[] } = await request(app.getHttpServer())
      .put('/v1/applications/a353d810-15eb-442f-b481-3eacba289e2a')
      .send({
        secretWord: 'The new word',
      })
      .expect(200)

    expect(response.body).toMatchObject({
      ...applicationResponse,
      secretWord: 'The new word',
    })
  })
})
