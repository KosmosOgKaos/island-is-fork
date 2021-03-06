import withApollo from '@island.is/web/graphql/withApollo'
import { withLocale } from '@island.is/web/i18n'
import newsItemScreen from '@island.is/web/screens/News'

export default withApollo(withLocale('en')(newsItemScreen))
