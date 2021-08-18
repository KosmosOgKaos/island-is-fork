import request from 'supertest'
import { INestApplication } from '@nestjs/common'
import { setup } from '../../../../../../test/setup'
import { Union } from '../../models/union.model'
import { unionResponse } from '../testHelpers'

describe('createUnion', () => {
  let app: INestApplication
  beforeAll(async () => {
    // create the nestjs test app
    app = await setup()
  })

  it(`POST /v1/unions should create a union`, async () => {
    const response: { body: Union[] } = await request(app.getHttpServer())
      .post('/v1/unions')
      .send({
        name: 'VR',
      })
      .expect(201)

    expect(response.body).toMatchObject(unionResponse)
  })
})
