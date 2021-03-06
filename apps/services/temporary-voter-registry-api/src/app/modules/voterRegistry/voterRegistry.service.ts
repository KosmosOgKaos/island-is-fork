import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { VoterRegistry } from './voterRegistry.model'
import { LOGGER_PROVIDER } from '@island.is/logging'
import type { Logger } from '@island.is/logging'

@Injectable()
export class VoterRegistryService {
  private version?: number
  constructor(
    @InjectModel(VoterRegistry)
    private voterRegistryModel: typeof VoterRegistry,
    @Inject(LOGGER_PROVIDER)
    private logger: Logger,
  ) {}

  private async getVersion() {
    // we don't need to ask database for version if we already got the version
    if (this.version) {
      return this.version
    }
    const { version } = await this.voterRegistryModel
      .findOne({
        order: [['version', 'DESC']],
      })
      .then((data) => {
        if (!data) {
          throw Error('Version not found')
        } else {
          return data
        }
      })
    this.version = version
    return version
  }

  // we return a not registered entry when no entry is found in registry
  getEmptyRegistryResponse = (nationalId: string): VoterRegistry =>
    ({
      id: '0',
      regionNumber: 0,
      regionName: 'Ekki á skrá',
      nationalId: nationalId,
    } as VoterRegistry)

  async findByNationalId(nationalId: string): Promise<VoterRegistry> {
    this.logger.debug(`Finding resource for nationalId - "${nationalId}"`)
    const currentVersion = await this.getVersion()
    const response = await this.voterRegistryModel.findOne({
      where: { nationalId, version: currentVersion },
    })

    return response ?? this.getEmptyRegistryResponse(nationalId)
  }
}
