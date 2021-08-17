import { service, ServiceBuilder } from '../../../../infra/src/dsl/dsl'
import { PostgresInfo } from '../../../../infra/src/dsl/types/input-types'

const postgresInfo: PostgresInfo = {
  passwordSecret: '/k8s/services-unemployment-benefits-api/DB_PASSWORD',
  name: 'services_party_letter_registry_api',
  username: 'services_party_letter_registry_api',
}
export const serviceSetup = (): ServiceBuilder<'unemployment-benefits-api'> =>
  service('unemployment-benefits-api')
    .image('services-unemployment-benefits-api')
    .namespace('unemployment-benefits')
    .postgres(postgresInfo)
    .initContainer({
      containers: [
        {
          name: 'migrations',
          command: 'npx',
          args: ['sequelize-cli', 'db:migrate'],
        },
      ],
      postgres: postgresInfo,
    })
    .grantNamespaces('islandis', 'application-system')
    .liveness('/liveness')
    .readiness('/liveness')
