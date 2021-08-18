import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { LOGGER_PROVIDER } from '@island.is/logging'
import type { Logger } from '@island.is/logging'
import { Union } from './models/union.model'

@Injectable()
export class UnionsService {
  constructor(
    @InjectModel(Union)
    private unionModel: typeof Union,
    @Inject(LOGGER_PROVIDER)
    private logger: Logger,
  ) {}

  async getAllUnions(): Promise<Union[]> {
    this.logger.info('Getting all unions')
    return await this.unionModel.findAll({
      order: ['name'],
    })
  }
}
