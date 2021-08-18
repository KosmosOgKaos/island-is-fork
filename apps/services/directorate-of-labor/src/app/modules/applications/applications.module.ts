import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Application } from './models/application.model'
import { ApplicationController } from './controllers/application.controller'
import { ApplicationsService } from './applications.service'

@Module({
  imports: [SequelizeModule.forFeature([Application])],
  controllers: [ApplicationController],
  providers: [ApplicationsService],
})
export class ApplicationsModule {}
