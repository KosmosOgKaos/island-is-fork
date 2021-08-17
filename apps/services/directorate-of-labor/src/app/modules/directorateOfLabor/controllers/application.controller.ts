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
import { Application } from '../models/application.model'
import { DirectorateOfLaborService } from '../directorateOfLabor.service'
import { CreateApplicationDto } from '../dto/createApplication.dto'
import { UpdateApplicationDto } from '../dto/updateApplication.dto'

const assertExists = <T>(resource: T): void => {
  if (!resource) {
    throw new NotFoundException("This resource doesn't exist")
  }
}

@Controller('applications')
export class ApplicationController {
  constructor(
    private readonly directorateOfLaborService: DirectorateOfLaborService,
  ) {}

  @Get(':applicationId')
  @ApiOkResponse({ type: Application })
  async getApplication(@Param('applicationId') applicationId: string) {
    const application = await this.directorateOfLaborService.getApplicationById(
      applicationId,
    )
    assertExists(application)
    return application
  }

  @Post()
  @ApiOkResponse({ type: Application })
  async createApplication(@Body() application: CreateApplicationDto) {
    return this.directorateOfLaborService.createApplication(application)
  }

  @Put(':applicationId')
  @ApiOkResponse({ type: Application })
  async updateApplication(
    @Param('applicationId') applicationId: string,
    @Body() update: UpdateApplicationDto,
  ) {
    const application = await this.directorateOfLaborService.updateApplication(
      applicationId,
      update,
    )
    assertExists(application)
    return application
  }

  @Delete(':applicationId')
  async deleteApplication(
    @Param('applicationId') applicationId: string,
  ): Promise<boolean> {
    return await this.directorateOfLaborService.deleteApplication(applicationId)
  }
}
