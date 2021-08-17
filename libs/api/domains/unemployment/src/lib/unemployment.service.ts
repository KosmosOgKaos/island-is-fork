import { Inject, Injectable } from '@nestjs/common'
import { LOGGER_PROVIDER } from '@island.is/logging'
import { ApolloError } from 'apollo-server-express'
import type { Logger } from '@island.is/logging'
import { SubmitApplicationDto } from './dto/submitApplication.input'
import { DirectorateOfLaborClient } from '@island.is/clients/directorate-of-labor-v1'

@Injectable()
export class UnemploymentService {
  constructor(
    @Inject(LOGGER_PROVIDER) private logger: Logger,
    private directorateOfLaborClient: DirectorateOfLaborClient,
  ) {}

  private async handleError(error: any): Promise<never> {
    this.logger.error(JSON.stringify(error))

    if (error.json) {
      const json = await error.json()
      this.logger.error(json)
      throw new ApolloError(JSON.stringify(json), error.status)
    }

    throw new ApolloError('Failed to resolve request', error.status)
  }

  submitApplication(nationalId: string, application: SubmitApplicationDto) {
    return this.directorateOfLaborClient
      .submitApplication(nationalId, application)
      .catch(this.handleError.bind(this))
  }
}
