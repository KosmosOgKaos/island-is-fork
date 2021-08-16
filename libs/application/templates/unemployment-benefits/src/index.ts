import UnemploymentBenefitsTemplate from './lib/UnemploymentBenefitsTemplate'

export const getDataProviders = () => import('./dataProviders/')
export const getFields = () => import('./fields/')

export default UnemploymentBenefitsTemplate
