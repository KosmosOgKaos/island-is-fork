import { Module, DynamicModule } from '@nestjs/common'
import { UnemploymentResolver } from './unemployment.resolver'
import { UnemploymentService } from './unemployment.service'

export interface Config {
  baseApiUrl: string
}

@Module({})
export class UnemploymentModule {
  static register(config: Config): DynamicModule {
    return {
      module: UnemploymentModule,
      providers: [UnemploymentResolver, UnemploymentService],
      exports: [],
    }
  }
}
