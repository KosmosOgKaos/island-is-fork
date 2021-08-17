'use strict'
const { uuid } = require('uuidv4')

const union = (name) => ({
  name,
  union_id: uuid(),
  created: new Date(),
  modified: new Date(),
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('unions', [
      union('Verzlunarmannafélag Reykjavíkur (VR)'),
      union('Efling'),
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('unions', null, {})
  },
}
