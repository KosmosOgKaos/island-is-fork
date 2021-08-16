import { DynamicModule } from '@nestjs/common'

import { FamilyMemberResolver, UserResolver } from './graphql'
import { NationalRegistryService } from './nationalRegistry.service'
import {
  NationalRegistryApi,
  NationalRegistryConfig,
} from '@island.is/clients/national-registry-v1'
import {
  NationalRegistryClient,
  NationalRegistryClientConfig,
} from '@island.is/clients/national-registry-v3'

export interface Config {
  nationalRegistry: NationalRegistryConfig
  nationalRegistryClient: NationalRegistryClientConfig
}

export class NationalRegistryModule {
  static register(config: Config): DynamicModule {
    return {
      module: NationalRegistryModule,
      providers: [
        NationalRegistryService,
        UserResolver,
        FamilyMemberResolver,
        {
          provide: NationalRegistryApi,
          useFactory: async () =>
            NationalRegistryApi.instanciateClass(config.nationalRegistry),
        },
        {
          provide: NationalRegistryClient,
          useFactory: async () =>
            new NationalRegistryClient(config.nationalRegistryClient),
        },
      ],
      exports: [NationalRegistryService],
    }
  }
}
