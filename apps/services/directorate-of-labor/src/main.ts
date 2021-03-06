import { bootstrap } from '@island.is/infra-nest-server'

import { AppModule } from './app/app.module'
import { openApi } from './openApi'

bootstrap({
  appModule: AppModule,
  name: 'services-unemployment-benefits',
  openApi,
  port: 4252,
  swaggerPath: '',
})
