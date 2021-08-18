import { AuthConfig, AuthModule } from '@island.is/auth-nest-tools'
import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { environment } from '../environments'
import { ApplicationsModule } from './modules/applications/applications.module'
import { PensionFundsModule } from './modules/pensionFunds/pensionFunds.module'
import { UnionsModule } from './modules/unions/unions.module'
import { SequelizeConfigService } from './sequelizeConfig.service'

@Module({
  imports: [
    AuthModule.register(environment.auth as AuthConfig),
    SequelizeModule.forRootAsync({
      useClass: SequelizeConfigService,
    }),
    ApplicationsModule,
    UnionsModule,
    PensionFundsModule,
  ],
  providers: [],
})
export class AppModule {}
