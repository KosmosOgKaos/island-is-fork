import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { LOGGER_PROVIDER } from '@island.is/logging'
import type { Logger } from '@island.is/logging'
import { Union } from './models/union.model'
import { CreateUnionDto } from './dto/createUnion.dto'
import { UpdateUnionDto } from './dto/updateUnion.dto'

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

  async getUnionById(unionId: string): Promise<Union | null> {
    this.logger.debug(`Finding union by id: ${unionId}`)
    return await this.unionModel.findOne({
      where: {
        unionId,
      },
    })
  }

  async createUnion(create: CreateUnionDto): Promise<Union> {
    this.logger.debug('Creating union')
    return await this.unionModel.create(create)
  }

  async updateUnion(
    unionId: string,
    update: UpdateUnionDto,
  ): Promise<Union | null> {
    this.logger.debug(`Updating union with id ${unionId}`)
    const [, unions] = await this.unionModel.update(update, {
      where: { unionId },
      returning: true,
    })
    return unions[0]
  }

  async deleteUnion(unionId: string): Promise<boolean> {
    this.logger.debug(`Deleting union with id ${unionId}`)
    const count = await this.unionModel.destroy({
      where: { unionId },
    })
    return count > 0
  }
}
