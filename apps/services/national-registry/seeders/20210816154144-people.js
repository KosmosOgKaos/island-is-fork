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
        created: new Date(),
        modified: new Date(),
      },
      // child
      {
        national_id: '0101507789',
        full_name: 'Nebúkadnes',
        address: 'Lindargata 3',
        email: '',
        phone: '4265500',
        created: new Date(),
        modified: new Date(),
      },

      // parents
      {
        national_id: '0101302989',
        full_name: 'Gervimaður Ameríka',
        address: 'Nónsstígur 5',
        email: 'vg@island.is',
        phone: '4265501',
        partner_id: '0101304929',
        created: new Date(),
        modified: new Date(),
      },
      {
        national_id: '0101304929',
        full_name: 'Gervimaður Bretland',
        address: 'Nónsstígur 5',
        email: 'er@island.is',
        phone: '4265502',
        partner_id: '0101302989',
        created: new Date(),
        modified: new Date(),
      },
      //child
      {
        national_id: '0101504929',
        full_name: 'Gervibarn (7 ára)',
        address: 'Nónsstígur 5',
        email: '',
        phone: '4265502',
        created: new Date(),
        modified: new Date(),
      },
      {
        national_id: '0110903389',
        full_name: 'Stefán',
        address: 'Nónsstígur 5',
        email: 'vg@island.is',
        phone: '4265501',
        partner_id: '0101304929',
        created: new Date(),
        modified: new Date(),
      },
      {
        national_id: '1511982449',
        full_name: 'Alex',
        address: 'Nónsstígur 5',
        email: 'vg@island.is',
        phone: '4265501',
        partner_id: '0101304929',
        created: new Date(),
        modified: new Date(),
      },
    ])

    await queryInterface.bulkInsert('people_children', [
      {
        parent_id: '0101302989',
        child_id: '0101504929',
        created: new Date(),
        modified: new Date(),
      },
      {
        parent_id: '0101304929',
        child_id: '0101504929',
        created: new Date(),
        modified: new Date(),
      },

      {
        parent_id: '0101307789',
        child_id: '0101507789',
        created: new Date(),
        modified: new Date(),
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('people_children', null, {})
    await queryInterface.bulkDelete('people', null, {})
  },
}
