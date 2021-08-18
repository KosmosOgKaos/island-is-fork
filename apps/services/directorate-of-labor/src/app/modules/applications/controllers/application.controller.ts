import { ApiOkResponse } from '@nestjs/swagger'
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  HttpCode,
} from '@nestjs/common'
import { Application } from '../models/application.model'
import { ApplicationsService } from '../applications.service'
import { CreateApplicationDto } from '../dto/createApplication.dto'
import { UpdateApplicationDto } from '../dto/updateApplication.dto'
import { assertExists } from '../../../lib/helpers'
@Controller('v1/applications')
export class ApplicationController {
  constructor(
    private readonly directorateOfLaborService: ApplicationsService,
  ) {}

  @Get()
  @ApiOkResponse({ type: Application })
  async getAllApplications() {
    return await this.directorateOfLaborService.getAllApplications()
  }

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

  @HttpCode(204)
  @Delete(':applicationId')
  async deleteApplication(
    @Param('applicationId') applicationId: string,
  ): Promise<void> {
    await this.directorateOfLaborService.deleteApplication(applicationId)
    return
  }
}
