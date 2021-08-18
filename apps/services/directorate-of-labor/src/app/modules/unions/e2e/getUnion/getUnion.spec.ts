import request from 'supertest'
import { INestApplication } from '@nestjs/common'
import { setup } from '../../../../../../test/setup'
import { Union } from '../../models/union.model'
import { unionResponse } from '../testHelpers'

describe('getUnion', () => {
  let app: INestApplication
  beforeAll(async () => {
    // create the nestjs test app
    app = await setup()
  })

  it(`GET /v1/unions/:unionId should return a Union`, async () => {
    const response: { body: Union[] } = await request(app.getHttpServer())
      .get('/v1/unions/a353d810-15eb-442f-b481-3eacba289e1a')
      .send()
      .expect(200)

    expect(response.body).toMatchObject(unionResponse)
  })
})
