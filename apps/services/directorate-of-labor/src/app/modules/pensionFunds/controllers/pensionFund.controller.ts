import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { Controller, Get } from '@nestjs/common'
import { PensionFund } from '../models/pensionFund.model'
import { PensionFundsService } from '../pensionFunds.service'

@ApiTags('pensionFunds')
@Controller('v1/pension-funds')
export class PensionFundController {
  constructor(private readonly pensionFundsService: PensionFundsService) {}

  @Get()
  @ApiOkResponse({ type: [PensionFund] })
  async listPensionFunds() {
    return await this.pensionFundsService.getAllPensionFunds()
  }
}
