import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import {
  DelegationsService,
  Delegation,
  DelegationScope,
  DelegationScopeService,
  IdentityResource,
  ApiScope,
} from '@island.is/auth-api-lib'
import { DelegationsController } from './delegations.controller'
import { RskModule } from '@island.is/clients/rsk/v2'
import { RskConfig } from './rsk.config'
import { NationalRegistryModule } from '@island.is/clients/national-registry-v2'
import { NationalRegistryConfig } from './national-registry.config'

@Module({
  imports: [
    SequelizeModule.forFeature([
      Delegation,
      DelegationScope,
      ApiScope,
      IdentityResource,
    ]),
    RskModule.register(RskConfig),
    NationalRegistryModule.register(NationalRegistryConfig),
  ],
  controllers: [DelegationsController],
  providers: [DelegationsService, DelegationScopeService],
})
export class DelegationsModule {}
