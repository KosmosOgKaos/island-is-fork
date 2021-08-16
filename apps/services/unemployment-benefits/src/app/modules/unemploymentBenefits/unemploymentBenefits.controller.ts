import { CurrentUser, Scopes } from '@island.is/auth-nest-tools'
import { Body, Controller, Get, NotFoundException, Post } from '@nestjs/common'
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOAuth2,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'
import { EndorsementsScope } from '@island.is/auth/scopes'
import { Audit } from '@island.is/nest/audit'
import { CreateDto } from './dto/create.dto'
import { Person } from './unemploymentBenefits.model'
import { UnemploymentBenefitsService } from './unemploymentBenefits.service'
import { environment } from '../../../environments'
//import type { User } from '@island.is/auth-nest-tools'

// @Audit<Person>({
//   namespace: `${environment.audit.defaultNamespace}/unemployment-benefits`,
// })
@Controller('people')
// @ApiOAuth2([])
// @ApiTags('person')
export class UnemploymentBenefitsController {
  constructor(
    private readonly unemploymentBenefitsService: UnemploymentBenefitsService,
  ) {}

  @Get()
  async findPerson() {
    const resource = this.unemploymentBenefitsService.findPersonByNationalId('0101307789')

    if (!resource) {
      throw new NotFoundException("This resource doesn't exist")
    }

    return resource
  }

  // @ApiOkResponse({
  //   description: 'Finds party letter by manager given users authentication',
  //   type: Person,
  // })
  // @Audit<PartyLetterRegistry>({
  //   resources: (voterRegistry) => voterRegistry.partyLetter,
  // })
  // @Scopes(EndorsementsScope.main)
  // @Get('manager')
  // async findAsManagerByAuth(
  //   @CurrentUser() user: User,
  // ): Promise<PartyLetterRegistry> {
  //   const resource = await this.partyLetterRegistryService.findByManager(
  //     user.nationalId,
  //   )
  //
  //   if (!resource) {
  //     throw new NotFoundException("This resource doesn't exist")
  //   }
  //
  //   return resource
  // }
  //
  // @ApiCreatedResponse({
  //   description: 'Creates a new party letter entry',
  //   type: PartyLetterRegistry,
  // })
  // @ApiBody({
  //   type: CreateDto,
  // })
  // @Audit<PartyLetterRegistry>({
  //   resources: (voterRegistry) => voterRegistry.partyLetter,
  //   meta: (voterRegistry) => ({ owner: voterRegistry.owner }),
  // })
  // @Scopes(EndorsementsScope.main)
  // @Post()
  // async create(@Body() input: CreateDto): Promise<PartyLetterRegistry> {
  //   return await this.partyLetterRegistryService.create(input)
  // }
}
