import ParentalLeaveTemplate from './lib/ParentalLeaveTemplate'

export const getDataProviders = () => import('./dataProviders/')

export const getFields = () => import('./fields/')

export default ParentalLeaveTemplate

export * from './lib/parentalLeaveUtils'
export * from './constants'
export * from './types'
