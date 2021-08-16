import { Inject, Injectable } from '@nestjs/common'
import { LOGGER_PROVIDER } from '@island.is/logging'
import { ApolloError } from 'apollo-server-express'
import type { Logger } from '@island.is/logging'
import { SubmitApplicationDto } from './dto/submitApplication.input'

@Injectable()
export class UnemploymentService {
  constructor(@Inject(LOGGER_PROVIDER) private logger: Logger) {}

  private async handleError(error: any): Promise<never> {
    this.logger.error(JSON.stringify(error))

    if (error.json) {
      const json = await error.json()
      this.logger.error(json)
      throw new ApolloError(JSON.stringify(json), error.status)
    }

    throw new ApolloError('Failed to resolve request', error.status)
  }

  // TODO: Handle auth here
  submitApplication(application: SubmitApplicationDto) {
    this.logger.info('Getting request', application)
    // TODO: Send to VMST here
    // TODO: Handle error response here
    return {
      id: 'SomeIdHere',
      name: 'This is some guy',
    }
  }
}

/*
How is API auth handled today?
Can we use island.is login?
*/
