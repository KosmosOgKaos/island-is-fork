const faker = require('faker')

module.exports = {
  getGenericApplication: () => ({
    application_id: faker.random.uuid(),
    national_id: '0000000000',
    secret_word: faker.lorem.words(2),
    get_paper_copy: faker.random.boolean(),
    employment_status: faker.lorem.words(2),
    employment_ratio: Number(faker.finance.amount(1, 100)),
    bank: faker.finance.account(),
    pension_fund_percentage: Number(faker.finance.amount(1, 100)),
    personal_tax_credit_ratio: Number(faker.finance.amount(1, 100)),
    personal_tax_credit_monthly_amount: faker.random.number(),
    monthly_income: faker.random.number(),
    insurance_payments: faker.random.number(),
    pension_payments: faker.random.number(),
    income_step_one: Number(faker.finance.amount(1, 100)),
    income_step_two: Number(faker.finance.amount(1, 100)),
    on_parental_leave: faker.random.boolean(),
    union_id: faker.random.uuid(),
    pension_fund_id: faker.random.uuid(),
    private_pension_fund_id: faker.random.uuid(),
    created: new Date(),
    modified: new Date(),
  }),
}
