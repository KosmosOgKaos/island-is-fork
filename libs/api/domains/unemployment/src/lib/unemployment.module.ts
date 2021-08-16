import { Module, DynamicModule } from '@nestjs/common'
import {
  UnemploymentRegistryClient,
  UnemploymentRegistryClientConfig,
} from '@island.is/clients/unemployment-registry-v1'
import { UnemploymentResolver } from './unemployment.resolver'
import { UnemploymentService } from './unemployment.service'

export interface Config {
  unemploymentRegistryClient: UnemploymentRegistryClientConfig
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
          provide: UnemploymentRegistryClient,
          useFactory: async () =>
            new UnemploymentRegistryClient(config.unemploymentRegistryClient),
        },
      ],
      exports: [],
    }
  }
}
