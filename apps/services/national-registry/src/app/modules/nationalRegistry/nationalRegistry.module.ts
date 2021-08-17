import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Person } from './models/person.model'
import { PersonChild } from './models/personChild.model'
import { NationalRegistryService } from './nationalRegistry.service'
import { PeopleController } from './controllers/people.controller'
import { ChildrenController } from './controllers/children.controller'

@Module({
  imports: [SequelizeModule.forFeature([Person, PersonChild])],
  controllers: [PeopleController, ChildrenController],
  providers: [NationalRegistryService],
})
export class NationalRegistryModule {}
