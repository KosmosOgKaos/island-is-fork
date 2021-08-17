'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      await queryInterface.createTable('applications', {
        application_id: {
          type: Sequelize.UUID,
          primaryKey: true,
          allowNull: false,
          defaultValue: Sequelize.UUIDV4,
        },
        national_id: {
          type: Sequelize.CHAR(10),
          allowNull: false,
        },
        secret_word: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        get_paper_copy: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        employment_status: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        employment_ratio: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        bank: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        pension_fund: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        union: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        private_pension_fund: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        pension_fund_percentage:  {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        personal_tax_credit_ratio: {
          type: Sequelize.FLOAT, // 1<x<100
          allowNull: false,
        },
        personal_tax_credit_monthly_amount: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        monthly_income: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        insurance_payments: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        pension_payments: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        income_step_one: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        income_step_two: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        on_parental_leave: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        created: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        modified: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      })

      transaction.commit()
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('applications')
  },
}
