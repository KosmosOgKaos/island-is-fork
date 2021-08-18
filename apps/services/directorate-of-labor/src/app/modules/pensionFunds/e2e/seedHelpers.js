const faker = require('faker')

module.exports = {
  getGenericPensionFund: (pensionFund) => ({
    pension_fund_id: faker.random.uuid(),
    name: faker.lorem.words(2),
    active: true,
    created: new Date(),
    modified: new Date(),
    ...pensionFund,
  }),
}
