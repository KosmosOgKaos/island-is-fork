'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      await queryInterface.createTable('people', {
        national_id: {
          type: Sequelize.CHAR(10),
          primaryKey: true,
        },
        full_name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        address: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        phone: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        spouse_id: {
          type: Sequelize.CHAR(10),
          references: {
            model: 'people',
            key: 'national_id',
          },
        },
      })

      await queryInterface.createTable('people_children', {
        parent_id: {
          type: Sequelize.CHAR(10),
          primaryKey: true,
          references: {
            model: 'people',
            key: 'national_id',
          },
        },
        child_id: {
          type: Sequelize.CHAR(10),
          primaryKey: true,
          references: {
            model: 'people',
            key: 'national_id',
          },
        },
      })
      transaction.commit()
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('people')
    await queryInterface.dropTable('people_children')
  },
}
