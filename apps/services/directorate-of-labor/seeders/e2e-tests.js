'use strict'

const applicationsFindAll = require('../src/app/modules/applications/e2e/findAllEndorsement/seed.js')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const applications = [...applicationsFindAll]

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
