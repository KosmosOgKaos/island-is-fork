'use strict'

const union = ({ name, union_id }) => ({
  name,
  union_id,
  created: new Date(),
  modified: new Date(),
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('unions', [
      union({
        union_id: '86553292-4f26-4f79-82eb-9092e830e20f',
        name: 'Verzlunarmannafélag Reykjavíkur (VR)',
      }),
      union({
        name: 'Efling',
        union_id: 'f5194065-6039-44c9-9e22-c32a807fd84a',
      }),
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('unions', null, {})
  },
}
