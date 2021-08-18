import request from 'supertest'
import { INestApplication } from '@nestjs/common'
import { setup } from '../../../../../../test/setup'

describe('deleteApplication', () => {
  let app: INestApplication
  beforeAll(async () => {
    // create the nestjs test app
    app = await setup()
  })

  it(`DELETE /v1/applications/:applicationID should remove existing application`, async () => {
    await request(app.getHttpServer())
      .delete('/v1/applications/a353d810-15eb-442f-b481-3eacba289e3a')
      .send()
      .expect(204)
  })
})
