import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Person } from './unemploymentBenefits.model'
import { UnemploymentBenefitsService } from './unemploymentBenefits.service'
import { UnemploymentBenefitsController } from './unemploymentBenefits.controller'

@Module({
  imports: [SequelizeModule.forFeature([Person])],
  controllers: [UnemploymentBenefitsController],
  providers: [UnemploymentBenefitsService],
})
export class UnemploymentBenefitsModule {}
