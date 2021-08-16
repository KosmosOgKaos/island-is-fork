import { CurrentUser, Scopes } from '@island.is/auth-nest-tools'
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Delete,
  HttpCode,
} from '@nestjs/common'
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOAuth2,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'
import { EndorsementsScope } from '@island.is/auth/scopes'
import { Audit } from '@island.is/nest/audit'
import { CreatePersonDto } from '../dto/createPerson.dto'
import { UpdatePersonDto } from '../dto/updatePerson.dto'
import { Person } from '../unemploymentBenefits.model'
import { UnemploymentBenefitsService } from '../unemploymentBenefits.service'
//import { environment } from '../../../../environments'
//import type { User } from '@island.is/auth-nest-tools'

const assertExists = <T>(resource: T): void => {
  if (!resource) {
    throw new NotFoundException("This resource doesn't exist")
  }
}

@Controller('people')
export class NationalRegisterController {
  constructor(
    private readonly unemploymentBenefitsService: UnemploymentBenefitsService,
  ) {}

  @Get(':nationalId')
  async findPerson(@Param('nationalId') nationalId: string) {
    const person = this.unemploymentBenefitsService.findPersonByNationalId(
      nationalId,
    )
    assertExists(person)
    return person
  }

  @Post()
  @ApiOkResponse({ type: Person })
  async createPerson(@Body() person: CreatePersonDto) {
    return this.unemploymentBenefitsService.createPerson(person)
  }

  @Put(':nationalId')
  @ApiOkResponse({ type: Person })
  async updatePerson(
    @Param('nationalId') nationalId: string,
    @Body() update: UpdatePersonDto,
  ) {
    const person = await this.unemploymentBenefitsService.updatePerson(
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
    return await this.unemploymentBenefitsService.deletePerson(nationalId)
  }
}
