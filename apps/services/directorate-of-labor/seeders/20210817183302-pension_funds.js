'use strict'

const pensionFund = ({ name, id }) => ({
  name,
  pension_fund_id: id,
  created: new Date(),
  modified: new Date(),
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('pension_funds', [
      pensionFund({
        id: 'ca971a91-0bfc-4987-9b79-47f679f30ad9',
        name: 'Lífeyrissjóður verzlunarmanna',
      }),
      pensionFund({
        id: '53e0482d-b177-451f-bec3-17b5ec64b1fa',
        name: 'Almenni',
      }),
      pensionFund({
        id: '48aea848-227f-4430-bbb5-f28413c38066',
        name: 'Birta',
      }),
      pensionFund({ id: 'a9eb3827-8d18-4950-b678-3e1f4906cd2d', name: 'Brú' }),
      pensionFund({
        id: '187929f8-f439-45a4-acb3-43cff2d834ab',
        name: 'Gildi',
      }),
      pensionFund({
        id: '15f22281-7b11-41e1-9f23-c80b49756bee',
        name: 'Stapi',
      }),
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('pension_funds', null, {})
  },
}
