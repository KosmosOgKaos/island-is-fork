import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Person } from './models/person.model'
import { NationalRegistryService } from './nationalRegistry.service'
import { PeopleController } from './controllers/people.controller'

@Module({
  imports: [SequelizeModule.forFeature([Person])],
  controllers: [PeopleController],
  providers: [NationalRegistryService],
})
export class NationalRegistryModule {}
