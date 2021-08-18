'use strict'

const getAllApplication = require('../src/app/modules/applications/e2e/getAllApplications/seed.js')
const getApplication = require('../src/app/modules/applications/e2e/getApplication/seed.js')
const updateApplication = require('../src/app/modules/applications/e2e/updateApplication/seed.js')
const deleteApplication = require('../src/app/modules/applications/e2e/deleteApplication/seed.js')
const getAllUnion = require('../src/app/modules/unions/e2e/getAllUnion/seed.js')
const getUnion = require('../src/app/modules/unions/e2e/getUnion/seed.js')
const getAllPensionFund = require('../src/app/modules/pensionFunds/e2e/getAllPensionFunds/seed.js')
const getPensionFund = require('../src/app/modules/pensionFunds/e2e/getPensionFund/seed.js')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const applications = [
      ...getAllApplication,
      ...getApplication,
      ...updateApplication,
      ...deleteApplication,
    ]

    const unions = [
      ...getAllUnion,
      ...getUnion,
    ]

    const pensionFunds = [
      ...getAllPensionFund,
      ...getPensionFund,
    ]

    try {
      await queryInterface.bulkInsert('applications', applications)
      await queryInterface.bulkInsert('unions', unions)
      await queryInterface.bulkInsert('pension_funds', pensionFunds)
    } catch (e) {
      console.log('Cought')
      console.error(e)
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('applications')
    await queryInterface.bulkDelete('unions')
    await queryInterface.bulkDelete('pension_funds')
  },
}
