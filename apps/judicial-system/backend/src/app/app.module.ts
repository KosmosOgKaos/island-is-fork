import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'

import { SharedAuthModule } from '@island.is/judicial-system/auth'

import { environment } from '../environments'
import {
  CaseModule,
  CourtModule,
  FileModule,
  InstitutionModule,
  NotificationModule,
  UserModule,
} from './modules'
import { SequelizeConfigService } from './sequelizeConfig.service'

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useClass: SequelizeConfigService,
    }),
    SharedAuthModule.register({
      jwtSecret: environment.auth.jwtSecret,
      secretToken: environment.auth.secretToken,
    }),
    UserModule,
    CaseModule,
    NotificationModule,
    InstitutionModule,
    FileModule,
    CourtModule,
  ],
})
export class AppModule {}
