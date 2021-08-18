import request from 'supertest'
import { INestApplication } from '@nestjs/common'
import { setup } from '../../../../../../test/setup'
import { Application } from '../../models/application.model'
import { applicationResponse } from '../testHelpers'

describe('createApplication', () => {
  let app: INestApplication
  beforeAll(async () => {
    // create the nestjs test app
    app = await setup()
  })

  it(`POST /v1/applications should create an application`, async () => {
    const response: { body: Application[] } = await request(app.getHttpServer())
      .post('/v1/applications')
      .send({
        // eslint-disable-next-line local-rules/disallow-kennitalas
        nationalId: '0101307789',
        secretWord: 'Some text',
        getPaperCopy: false,
        employmentStatus: 'Some text',
        employmentRatio: 10,
        bank: 'Some text',
        pensionFundId: '43971f8d-055b-476e-97b9-7b79434560cc',
        unionId: '43971f8d-055b-476e-97b9-7b79434560cc',
        privatePensionFundId: '43971f8d-055b-476e-97b9-7b79434560cc',
        pensionFundPercentage: 39,
        personalTaxCreditRatio: 23,
        monthlyIncome: 320000,
        insurancePayments: 10000,
        onParentalLeave: false,
      })
      .expect(201)

    expect(response.body).toMatchObject(applicationResponse)
  })
})
