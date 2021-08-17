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

  async getApplicationById(applicationId: string): Promise<Application | null> {
    return await this.applicationModel.findOne({
      where: {
        applicationId,
      },
    })
  }

  async createApplication(create: CreateApplicationDto): Promise<Application> {
    return await this.applicationModel.create(create)
  }

  async updateApplication(
    applicationId: string,
    update: UpdateApplicationDto,
  ): Promise<Application | null> {
    const [, applications] = await this.applicationModel.update(update, {
      where: { applicationId },
      returning: true,
    })
    return applications[0]
  }

  async deleteApplication(applicationId: string): Promise<boolean> {
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
