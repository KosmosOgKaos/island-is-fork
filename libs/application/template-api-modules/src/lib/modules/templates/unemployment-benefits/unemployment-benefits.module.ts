import { DynamicModule } from '@nestjs/common'
import { SharedTemplateAPIModule } from '../../shared'
import { BaseTemplateAPIModuleConfig } from '../../../types'
import { UnemploymentBenefitsService } from './unemployment-benefits.service'

export class UnemploymentBenefitsModule {
  static register(config: BaseTemplateAPIModuleConfig): DynamicModule {
    return {
      module: UnemploymentBenefitsModule,
      imports: [SharedTemplateAPIModule.register(config)],
      providers: [UnemploymentBenefitsService],
      exports: [UnemploymentBenefitsService],
    }
  }
}
