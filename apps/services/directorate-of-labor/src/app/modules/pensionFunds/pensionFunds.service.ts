import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { LOGGER_PROVIDER } from '@island.is/logging'
import type { Logger } from '@island.is/logging'
import { PensionFund } from './models/pensionFund.model'
import { CreatePensionFundDto } from './dto/createPensionFund.dto'
import { UpdatePensionFundDto } from './dto/updatePensionFund.dto'

@Injectable()
export class PensionFundsService {
  constructor(
    @InjectModel(PensionFund)
    private pensionFundModel: typeof PensionFund,
    @Inject(LOGGER_PROVIDER)
    private logger: Logger,
  ) {}

  async getAllPensionFunds(): Promise<PensionFund[]> {
    this.logger.info('Getting all pension funds')
    return await this.pensionFundModel.findAll({
      order: ['name'],
    })
  }

  async getPensionFundById(pensionFundId: string): Promise<PensionFund | null> {
    this.logger.debug(`Finding pensionFund by id: ${pensionFundId}`)
    return await this.pensionFundModel.findOne({
      where: {
        pensionFundId,
      },
    })
  }
  async createPensionFund(create: CreatePensionFundDto): Promise<PensionFund> {
    this.logger.debug('Creating application')
    return await this.pensionFundModel.create(create)
  }

  async updatePensionFund(
    pensionFundId: string,
    update: UpdatePensionFundDto,
  ): Promise<PensionFund | null> {
    this.logger.debug(`Updating pensionFund with id ${pensionFundId}`)
    const [, pensionFunds] = await this.pensionFundModel.update(update, {
      where: { pensionFundId },
      returning: true,
    })
    return pensionFunds[0]
  }

  async deletePensionFund(pensionFundId: string): Promise<boolean> {
    this.logger.debug(`Deleting pensionFund with id ${pensionFundId}`)
    const count = await this.pensionFundModel.destroy({
      where: { pensionFundId },
    })
    return count > 0
  }
}
