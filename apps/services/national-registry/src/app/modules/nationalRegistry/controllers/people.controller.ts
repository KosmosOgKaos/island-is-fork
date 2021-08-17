import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common'
import {
  ApiOkResponse,
} from '@nestjs/swagger'
import { CreatePersonDto } from '../dto/createPerson.dto'
import { UpdatePersonDto } from '../dto/updatePerson.dto'
import { Person } from '../models/person.model'
import { NationalRegistryService } from '../nationalRegistry.service'

const assertExists = <T>(resource: T): void => {
  if (!resource) {
    throw new NotFoundException("This resource doesn't exist")
  }
}

@Controller('v1/people')
export class PeopleController {
  constructor(
    private readonly nationalRegistryService: NationalRegistryService
  ) {}

  @Get(':nationalId')
  @ApiOkResponse({ type: Person })
  async findPerson(@Param('nationalId') nationalId: string) {
    const person = await this.nationalRegistryService.findPersonByNationalId(
      nationalId,
    )
    assertExists(person)
    return person
  }

  @Post()
  @ApiOkResponse({ type: Person })
  async createPerson(@Body() person: CreatePersonDto) {
    return this.nationalRegistryService.createPerson(person)
  }

  @Put(':nationalId')
  @ApiOkResponse({ type: Person })
  async updatePerson(
    @Param('nationalId') nationalId: string,
    @Body() update: UpdatePersonDto,
  ) {
    const person = await this.nationalRegistryService.updatePerson(
      nationalId,
      update,
    )
    assertExists(person)
    return person
  }

  @Delete(':nationalId')
  async deletePerson(
    @Param('nationalId') nationalId: string,
  ): Promise<boolean> {
    return await this.nationalRegistryService.deletePerson(nationalId)
  }
}
