import { ApiOkResponse } from '@nestjs/swagger'
import { Controller, Get } from '@nestjs/common'
import { DirectorateOfLaborService } from '../directorateOfLabor.service'
import { PensionFund } from '../models/pensionFund.model'

@Controller('v1/pension-funds')
export class PensionFundController {
  constructor(
    private readonly directorateOfLaborService: DirectorateOfLaborService,
  ) {}

  @Get()
  @ApiOkResponse({ type: [PensionFund] })
  async listPensionFunds() {
    return await this.directorateOfLaborService.getAllPensionFunds()
  }
}
