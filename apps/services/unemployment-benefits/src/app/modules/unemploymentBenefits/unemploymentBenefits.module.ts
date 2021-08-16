import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Person, Application } from './unemploymentBenefits.model'
import { UnemploymentBenefitsService } from './unemploymentBenefits.service'
import { NationalRegisterController } from './controllers/NationalRegister.controller'
import { ApplicationController } from './controllers/application.controller'

@Module({
  imports: [SequelizeModule.forFeature([Person, Application])],
  controllers: [NationalRegisterController, ApplicationController],
  providers: [UnemploymentBenefitsService],
})
export class UnemploymentBenefitsModule {}
