'use strict'
const { uuid } = require('uuidv4')

const pensionFund = (name) => ({
  name,
  pension_fund_id: uuid(),
  created: new Date(),
  modified: new Date(),
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('pension_funds', [
      pensionFund('Lífeyrissjóður verzlunarmanna'),
      pensionFund('Almenni'),
      pensionFund('Birta'),
      pensionFund('Brú'),
      pensionFund('Gildi'),
      pensionFund('Stapi'),
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('pension_funds', null, {})
  },
}
