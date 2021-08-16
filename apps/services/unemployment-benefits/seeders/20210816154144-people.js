'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('people', [
      // parent
      {
        national_id: '0101307789',
        full_name: 'Gervimaður útlönd',
        address: 'Lindargata 3',
        email: 'gj@island.is',
        phone: '4265500',
      },
      // child
      {
        national_id: '0101507789',
        full_name: 'Nebúkadnes',
        address: 'Lindargata 3',
        email: '',
        phone: '4265500',
      },

      // parents
      {
        national_id: '0101302989',
        full_name: 'Gervimaður Ameríka',
        address: 'Nónsstígur 5',
        email: 'vg@island.is',
        phone: '4265501',
        spouse: '0101304929',
      },
      {
        national_id: '0101304929',
        full_name: 'Gervimaður Bretland',
        address: 'Nónsstígur 5',
        email: 'er@island.is',
        phone: '4265502',
        spouse: '0101302989',
      },
      //child
      {
        national_id: '0101504929',
        full_name: 'Gervibarn (7 ára)',
        address: 'Nónsstígur 5',
        email: '',
        phone: '4265502',
      },
    ])

    await queryInterface.bulkInsert('people_children', [
      {
        parent: '0101302989',
        child: '0101504929',
      },
      {
        parent: '0101304929',
        child: '0101504929',
      },

      {
        parent: '0101307789',
        child: '0101507789',
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    await queryInterface.bulkDelete('people_children', null, {})
    await queryInterface.bulkDelete('people', null, {})
  },
}
