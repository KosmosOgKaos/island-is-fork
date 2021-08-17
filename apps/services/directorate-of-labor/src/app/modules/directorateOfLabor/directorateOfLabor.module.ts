import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Application } from './models/application.model'
import { DirectorateOfLaborService } from './directorateOfLabor.service'
import { ApplicationController } from './controllers/application.controller'

@Module({
  imports: [SequelizeModule.forFeature([Application])],
  controllers: [ApplicationController],
  providers: [DirectorateOfLaborService],
})
export class DirectorateOfLaborModule {}
