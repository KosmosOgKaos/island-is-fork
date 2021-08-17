import UnemploymentBenefitsTemplate from './lib/UnemploymentBenefitsTemplate'
export { UnemploymentBenefitsSchema } from './lib/dataSchema'

export const getDataProviders = () => import('./dataProviders/')
export const getFields = () => import('./fields/')

export default UnemploymentBenefitsTemplate
