import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { Controller, Get } from '@nestjs/common'
import { Union } from '../models/union.model'
import { UnionsService } from '../unions.service'

@ApiTags('unions')
@Controller('v1/unions')
export class UnionController {
  constructor(private readonly unionsService: UnionsService) {}

  @Get()
  @ApiOkResponse({ type: [Union] })
  async listUnions() {
    return await this.unionsService.getAllUnions()
  }
}
