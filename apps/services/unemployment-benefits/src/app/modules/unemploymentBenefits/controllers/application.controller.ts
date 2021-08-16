import { CurrentUser, Scopes } from '@island.is/auth-nest-tools'
import { ApiOkResponse } from '@nestjs/swagger'
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
import { Person } from '../unemploymentBenefits.model'
import { UnemploymentBenefitsService } from '../unemploymentBenefits.service'
import { CreateApplicationDto } from '../dto/createApplication.dto'
import { UpdateApplicationDto } from '../dto/updateApplication.dto'
//import { environment } from '../../../../environments'
//import type { User } from '@island.is/auth-nest-tools'

const assertExists = <T>(resource: T): void => {
  if (!resource) {
    throw new NotFoundException("This resource doesn't exist")
  }
}

@Controller('applications')
export class ApplicationController {
  constructor(
    private readonly unemploymentBenefitsService: UnemploymentBenefitsService,
  ) {}

  @Get(':applicationId')
  async getApplication(@Param('applicationId') applicationId: string) {
    const application = this.unemploymentBenefitsService.getApplicationById(
      applicationId,
    )
    assertExists(application)
    return application
  }

  @Post()
  @ApiOkResponse({ type: Person })
  async createApplication(@Body() application: CreateApplicationDto) {
    return this.unemploymentBenefitsService.createApplication(application)
  }

  @Put(':applicationId')
  @ApiOkResponse({ type: Person })
  async updateApplication(
    @Param('applicationId') applicationId: string,
    @Body() update: UpdateApplicationDto,
  ) {
    const application = await this.unemploymentBenefitsService.updateApplication(
      applicationId,
      update,
    )
    assertExists(application)
    return application
  }

  @Delete(':applicationId')
  async deletePerson(
    @Param('applicationId') applicationId: string,
  ): Promise<boolean> {
    return await this.unemploymentBenefitsService.deleteApplication(
      applicationId,
    )
  }
}
