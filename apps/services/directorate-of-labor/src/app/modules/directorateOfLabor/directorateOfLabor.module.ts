import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Application } from './models/application.model'
import { DirectorateOfLaborService } from './directorateOfLabor.service'
import { ApplicationController } from './controllers/application.controller'
import { Union } from './models/union.model'
import { PensionFund } from './models/pensionFund.model'
import { UnionController } from './controllers/union.controller'
import { PensionFundController } from './controllers/pensionFund.controller'

@Module({
  imports: [SequelizeModule.forFeature([Application, Union, PensionFund])],
  controllers: [ApplicationController, UnionController, PensionFundController],
  providers: [DirectorateOfLaborService],
})
export class DirectorateOfLaborModule {}
