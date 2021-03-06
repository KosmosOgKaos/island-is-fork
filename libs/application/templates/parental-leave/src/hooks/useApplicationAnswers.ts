import { Application } from '@island.is/application/core'

import { getApplicationAnswers } from '../lib/parentalLeaveUtils'

export const useApplicationAnswers = (application: Application) => {
  return getApplicationAnswers(application.answers)
}

export type ApplicationAnswers = ReturnType<typeof useApplicationAnswers>
