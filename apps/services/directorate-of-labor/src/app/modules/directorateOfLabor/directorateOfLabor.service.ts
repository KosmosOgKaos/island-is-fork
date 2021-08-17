import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { LOGGER_PROVIDER } from '@island.is/logging'
import type { Logger } from '@island.is/logging'
import { Application } from './models/application.model'
import { CreateApplicationDto } from './dto/createApplication.dto'
import { UpdateApplicationDto } from './dto/updateApplication.dto'
import { Union } from './models/union.model'
import { PensionFund } from './models/pensionFund.model'

@Injectable()
export class DirectorateOfLaborService {
  constructor(
    @InjectModel(Application)
    private applicationModel: typeof Application,
    @InjectModel(Union)
    private unionModel: typeof Union,
    @InjectModel(PensionFund)
    private pensionFundModel: typeof PensionFund,
    @Inject(LOGGER_PROVIDER)
    private logger: Logger,
  ) {}

  async getAllApplications(): Promise<Application[]> {
    this.logger.debug(`Finding all applications`)
    return await this.applicationModel.findAll()
  }

  async getApplicationById(applicationId: string): Promise<Application | null> {
    this.logger.debug(`Finding application by id: ${applicationId}`)
    return await this.applicationModel.findOne({
      where: {
        applicationId,
      },
    })
  }

  async createApplication(create: CreateApplicationDto): Promise<Application> {
    this.logger.debug('Creating application')
    return await this.applicationModel.create({
      ...create,
      // constants these values would come from a trusted external source
      personalTaxCreditMonthlyAmount: 50792,
      pensionPayments: 1,
      incomeStepOne: 31.45,
      incomeStepTwo: 37.95,
    })
  }

  async updateApplication(
    applicationId: string,
    update: UpdateApplicationDto,
  ): Promise<Application | null> {
    this.logger.debug(`Updating application with id ${applicationId}`)
    const [, applications] = await this.applicationModel.update(update, {
      where: { applicationId },
      returning: true,
    })
    return applications[0]
  }

  async deleteApplication(applicationId: string): Promise<boolean> {
    this.logger.debug(`Deleting application with id ${applicationId}`)
    const count = await this.applicationModel.destroy({
      where: { applicationId },
    })
    return count > 0
  }

  async getAllUnions(): Promise<Union[]> {
    return await this.unionModel.findAll({
      order: ['name'],
    })
  }

  async getAllPensionFunds(): Promise<PensionFund[]> {
    return await this.pensionFundModel.findAll({
      order: ['name'],
    })
  }
}
