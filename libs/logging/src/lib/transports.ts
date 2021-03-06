import * as Sentry from '@sentry/node'
import { TransformableInfo } from 'logform'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const TransportStream = require('winston-transport')

export class SentryTransport extends TransportStream {
  constructor() {
    super({ level: 'error' })
  }

  log(info: TransformableInfo, next: () => void) {
    // Checks whether sentry has been initialized
    // https://github.com/getsentry/sentry-go/issues/9
    if (Sentry.getCurrentHub()?.getClient()) {
      if (info.extra) {
        Object.keys(info.extra).forEach((key) => {
          Sentry.setExtra(key, info.extra[key])
        })
      }

      Sentry.captureMessage(info.message)
    }

    next()
  }
}
