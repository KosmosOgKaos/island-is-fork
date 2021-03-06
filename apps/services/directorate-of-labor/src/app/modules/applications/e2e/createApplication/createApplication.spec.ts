import request from 'supertest'
import { INestApplication } from '@nestjs/common'
import { Application } from '../../models/application.model'
import { applicationResponse } from '../testHelpers'
import { setup } from '../../../../../../test/setup'
import { errorResponse } from '../../../../../../test/globalTestHelpers'

const validApplication = {
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
}

describe('createApplication', () => {
  let app: INestApplication
  beforeAll(async () => {
    // create the nestjs test app
    app = await setup()
  })

  it(`POST /v1/applications should prevent you from updating protected fields on application`, async () => {
    const response: { body: Application[] } = await request(app.getHttpServer())
      .post('/v1/applications')
      .send({
        ...validApplication,
        incomeStepOne: 10.23, // exists on application but should not be altered on create
      })
      .expect(400)

    expect(response.body).toMatchObject({
      ...errorResponse,
      message: ['property incomeStepOne should not exist'],
    })
  })

  it(`POST /v1/applications should return message for all fields failing validation`, async () => {
    const response: { body: Application[] } = await request(app.getHttpServer())
      .post('/v1/applications')
      .send({
        ...validApplication,
        unionId: 'not-a-valid-uuid', // ins not a valid uuid
        monthlyIncome: '320000', // is not a number
      })
      .expect(400)

    expect(response.body).toMatchObject({
      ...errorResponse,
      message: [
        'unionId must be an UUID',
        'monthlyIncome must be an integer number',
      ],
    })
  })

  it(`POST /v1/applications should report missing required fields`, async () => {
    const response: { body: Application[] } = await request(app.getHttpServer())
      .post('/v1/applications')
      .send({
        ...validApplication,
        nationalId: undefined,
      })
      .expect(400)

    expect(response.body).toMatchObject({
      ...errorResponse,
      message: ['nationalId contains an invalid national id for a person'],
    })
  })

  it(`POST /v1/applications should create an application`, async () => {
    const response: { body: Application[] } = await request(app.getHttpServer())
      .post('/v1/applications')
      .send(validApplication)
      .expect(201)

    expect(response.body).toMatchObject(applicationResponse)
  })
})
