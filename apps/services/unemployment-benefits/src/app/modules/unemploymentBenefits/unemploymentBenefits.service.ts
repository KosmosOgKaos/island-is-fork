import { Inject, Injectable, MethodNotAllowedException } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { UniqueConstraintError } from 'sequelize'
import { LOGGER_PROVIDER } from '@island.is/logging'
import type { Logger } from '@island.is/logging'
import { Person, Application } from './unemploymentBenefits.model'
import { CreatePersonDto } from './dto/createPerson.dto'
import { UpdatePersonDto } from './dto/updatePerson.dto'
import { CreateApplicationDto } from './dto/createApplication.dto'
import { UpdateApplicationDto } from './dto/updateApplication.dto'

const handleDuplicateError = (error: Error): never => {
  if (error instanceof UniqueConstraintError) {
    throw new MethodNotAllowedException(error.errors.map((err) => err.message))
  } else {
    throw error
  }
}

@Injectable()
export class UnemploymentBenefitsService {
  constructor(
    @InjectModel(Person)
    private personModel: typeof Person,
    @InjectModel(Person)
    private applicationModel: typeof Application,
    @Inject(LOGGER_PROVIDER)
    private logger: Logger,
  ) {}

  async findPersonByNationalId(nationalId: string): Promise<Person | null> {
    this.logger.debug(`Finding person by national id - "${nationalId}`)
    return await this.personModel.findOne({
      where: {
        nationalId,
      },
    })
  }

  async createPerson(create: CreatePersonDto): Promise<Person> {
    return await this.personModel.create(create).catch(handleDuplicateError)
  }

  async updatePerson(
    nationalId: string,
    update: UpdatePersonDto,
  ): Promise<Person | null> {
    const [, persons] = await this.personModel.update(update, {
      where: { nationalId },
      returning: true,
    })
    return persons[0] ?? null
  }

  async deletePerson(nationalId: string): Promise<boolean> {
    const count = await this.personModel.destroy({
      where: { nationalId },
    })
    return count > 0
  }

  async getApplicationById(applicationId: string): Promise<Application | null> {
    return await this.applicationModel.findOne({
      where: {
        applicationId,
      },
    })
  }

  async createApplication(create: CreateApplicationDto): Promise<Application> {
    return await this.applicationModel.create(create)
  }

  async updateApplication(
    applicationId: string,
    update: UpdateApplicationDto,
  ): Promise<Application | null> {
    const [, applications] = await this.applicationModel.update(update, {
      where: { applicationId },
      returning: true,
    })
    return applications[0]
  }

  async deleteApplication(applicationId: string): Promise<boolean> {
    const count = await this.applicationModel.destroy({
      where: { applicationId },
    })
    return count > 0
  }
}
