import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { LOGGER_PROVIDER } from '@island.is/logging'
import type { Logger } from '@island.is/logging'
import { PensionFund } from './models/pensionFund.model'

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
}
