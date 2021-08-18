'use strict'

const getAllApplication = require('../src/app/modules/applications/e2e/getAllApplications/seed.js')
const getApplication = require('../src/app/modules/applications/e2e/getApplication/seed.js')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const applications = [...getAllApplication, ...getApplication]

    try {
      await queryInterface.bulkInsert('applications', applications)
    } catch (e) {
      console.log('Cought')
      console.error(e)
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('applications')
  },
}
