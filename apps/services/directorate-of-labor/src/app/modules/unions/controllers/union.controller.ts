import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { Union } from '../models/union.model'
import { UnionsService } from '../unions.service'
import { assertExists } from '../../../lib/helpers'
import { CreateUnionDto } from '../dto/createUnion.dto'
import { UpdateUnionDto } from '../dto/updateApplication.dto'

@ApiTags('unions')
@Controller('v1/unions')
export class UnionController {
  constructor(private readonly unionsService: UnionsService) {}

  @Get()
  @ApiOkResponse({ type: [Union] })
  async listUnions() {
    return await this.unionsService.getAllUnions()
  }

  @Get(':unionId')
  @ApiOkResponse({ type: Union })
  async getUnion(@Param('unionId') unionId: string) {
    const union = await this.unionsService.getUnionById(unionId)
    assertExists(union)
    return union
  }

  @Post()
  @ApiOkResponse({ type: Union })
  async createUnion(@Body() union: CreateUnionDto) {
    return this.unionsService.createUnion(union)
  }

  @Put(':unionId')
  @ApiOkResponse({ type: Union })
  async updateUnion(
    @Param('unionId') unionId: string,
    @Body() update: UpdateUnionDto,
  ) {
    const union = await this.unionsService.updateUnion(unionId, update)
    assertExists(union)
    return union
  }

  @Delete(':unionId')
  async deleteUnion(@Param('unionId') unionId: string): Promise<boolean> {
    return await this.unionsService.deleteUnion(unionId)
  }
}
