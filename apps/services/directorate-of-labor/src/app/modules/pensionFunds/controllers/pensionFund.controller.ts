import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { PensionFund } from '../models/pensionFund.model'
import { PensionFundsService } from '../pensionFunds.service'
import { assertExists } from '../../../lib/helpers'
import { CreatePensionFundDto } from '../dto/createPensionFund.dto'
import { UpdatePensionFundDto } from '../dto/updateApplication.dto'

@ApiTags('pensionFunds')
@Controller('v1/pension-funds')
export class PensionFundController {
  constructor(private readonly pensionFundsService: PensionFundsService) {}

  @Get()
  @ApiOkResponse({ type: [PensionFund] })
  async listPensionFunds() {
    return await this.pensionFundsService.getAllPensionFunds()
  }

  @Get(':pensionFundId')
  @ApiOkResponse({ type: PensionFund })
  async getPensionFund(@Param('pensionFundId') pensionFundId: string) {
    const union = await this.pensionFundsService.getPensionFundById(
      pensionFundId,
    )
    assertExists(union)
    return union
  }

  @Post()
  @ApiOkResponse({ type: PensionFund })
  async createPensionFund(@Body() union: CreatePensionFundDto) {
    return this.pensionFundsService.createPensionFund(union)
  }

  @Put(':pensionFundId')
  @ApiOkResponse({ type: PensionFund })
  async updatePensionFund(
    @Param('pensionFundId') pensionFundId: string,
    @Body() update: UpdatePensionFundDto,
  ) {
    const union = await this.pensionFundsService.updatePensionFund(
      pensionFundId,
      update,
    )
    assertExists(union)
    return union
  }

  @Delete(':pensionFundId')
  async deletePensionFund(
    @Param('pensionFundId') pensionFundId: string,
  ): Promise<boolean> {
    return await this.pensionFundsService.deletePensionFund(pensionFundId)
  }
}
