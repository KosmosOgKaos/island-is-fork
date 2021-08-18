import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Union } from './models/union.model'
import { UnionController } from './controllers/union.controller'
import { UnionsService } from './unions.service'

@Module({
  imports: [SequelizeModule.forFeature([Union])],
  controllers: [UnionController],
  providers: [UnionsService],
})
export class UnionsModule {}
