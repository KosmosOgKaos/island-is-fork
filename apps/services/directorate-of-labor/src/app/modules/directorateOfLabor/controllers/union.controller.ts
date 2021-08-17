import { ApiOkResponse } from '@nestjs/swagger'
import { Controller, Get } from '@nestjs/common'
import { DirectorateOfLaborService } from '../directorateOfLabor.service'
import { Union } from '../models/union.model'

@Controller('v1/unions')
export class UnionController {
  constructor(
    private readonly directorateOfLaborService: DirectorateOfLaborService,
  ) {}

  @Get()
  @ApiOkResponse({ type: [Union] })
  async listUnions() {
    return await this.directorateOfLaborService.getAllUnions()
  }
}
