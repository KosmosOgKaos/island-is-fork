import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { PensionFund } from './models/pensionFund.model'
import { PensionFundController } from './controllers/pensionFund.controller'
import { PensionFundsService } from './pensionFunds.service'

@Module({
  imports: [SequelizeModule.forFeature([PensionFund])],
  controllers: [PensionFundController],
  providers: [PensionFundsService],
})
export class PensionFundsModule {}
