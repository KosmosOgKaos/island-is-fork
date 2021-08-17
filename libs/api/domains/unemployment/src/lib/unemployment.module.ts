import { Module, DynamicModule } from '@nestjs/common'
import {
  DirectorateOfLaborClient,
  DirectorateOfLaborClientConfig,
} from '@island.is/clients/directorate-of-labor-v1'
import { UnemploymentResolver } from './unemployment.resolver'
import { UnemploymentService } from './unemployment.service'

export interface Config {
  directorateOfLaborClient: DirectorateOfLaborClientConfig
}

@Module({})
export class UnemploymentModule {
  static register(config: Config): DynamicModule {
    return {
      module: UnemploymentModule,
      providers: [
        UnemploymentResolver,
        UnemploymentService,
        {
          provide: DirectorateOfLaborClient,
          useFactory: async () =>
            new DirectorateOfLaborClient(config.directorateOfLaborClient),
        },
      ],
      exports: [],
    }
  }
}
