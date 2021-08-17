import { AuthConfig, AuthModule } from '@island.is/auth-nest-tools'
import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { environment } from '../environments'
import { DirectorateOfLaborModule } from './modules/directorateOfLabor/directorateOfLabor.module'
import { SequelizeConfigService } from './sequelizeConfig.service'

@Module({
  imports: [
    AuthModule.register(environment.auth as AuthConfig),
    SequelizeModule.forRootAsync({
      useClass: SequelizeConfigService,
    }),
    DirectorateOfLaborModule,
  ],
  providers: [],
})
export class AppModule {}
