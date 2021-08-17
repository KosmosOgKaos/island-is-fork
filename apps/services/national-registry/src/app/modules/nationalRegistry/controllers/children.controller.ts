import { Controller, Get, NotFoundException, Param } from '@nestjs/common'
import { ApiOkResponse } from '@nestjs/swagger'
import { Person } from '../models/person.model'
import { NationalRegistryService } from '../nationalRegistry.service'

@Controller('people/:nationalId/children')
export class ChildrenController {
  constructor(
    private readonly nationalRegistryService: NationalRegistryService,
  ) {}

  @Get()
  @ApiOkResponse({ type: [Person] })
  async getChildren(@Param('nationalId') nationalId: string) {
    const parent = await this.nationalRegistryService.findPersonAndChildrenByNationalId(
      nationalId,
    )
    if (!parent) {
      throw new NotFoundException("This resource doesn't exist")
    }

    return parent.children
  }
}
