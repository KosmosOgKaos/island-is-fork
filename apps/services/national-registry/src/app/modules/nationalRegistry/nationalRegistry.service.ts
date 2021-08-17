import { Inject, Injectable, MethodNotAllowedException } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { UniqueConstraintError } from 'sequelize'
import { LOGGER_PROVIDER } from '@island.is/logging'
import type { Logger } from '@island.is/logging'
import { Person } from './models/person.model'
import { CreatePersonDto } from './dto/createPerson.dto'
import { UpdatePersonDto } from './dto/updatePerson.dto'

const handleDuplicateError = (error: Error): never => {
  if (error instanceof UniqueConstraintError) {
    throw new MethodNotAllowedException(error.errors.map((err) => err.message))
  } else {
    throw error
  }
}

@Injectable()
export class NationalRegistryService {
  constructor(
    @InjectModel(Person)
    private personModel: typeof Person,
    @Inject(LOGGER_PROVIDER)
    private logger: Logger,
  ) {}

  async findPersonByNationalId(nationalId: string): Promise<Person | null> {
    this.logger.debug(`Finding person by national id: ${nationalId}`)
    return await this.personModel.findOne({
      where: {
        nationalId,
      },
    })
  }

  async findPersonAndChildrenByNationalId(
    nationalId: string,
  ): Promise<Person | null> {
    this.logger.debug(
      `Finding person and children by national id: ${nationalId}`,
    )
    return await this.personModel.findOne({
      where: {
        nationalId,
      },
      include: [Person],
    })
  }

  async createPerson(create: CreatePersonDto): Promise<Person> {
    this.logger.debug(`Creating person`)
    return await this.personModel.create(create).catch(handleDuplicateError)
  }

  async updatePerson(
    nationalId: string,
    update: UpdatePersonDto,
  ): Promise<Person | null> {
    this.logger.debug(`Updating person with national id ${nationalId}`)
    const [, persons] = await this.personModel.update(update, {
      where: { nationalId },
      returning: true,
    })
    return persons[0] ?? null
  }

  async deletePerson(nationalId: string): Promise<boolean> {
    this.logger.debug(`Deleting person with national id ${nationalId}`)
    const count = await this.personModel.destroy({
      where: { nationalId },
    })
    return count > 0
  }
}
