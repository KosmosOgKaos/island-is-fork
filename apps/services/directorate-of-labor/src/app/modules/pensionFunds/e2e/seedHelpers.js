const faker = require('faker')

module.exports = {
  getPensionFund: (pensionFund) => ({
    pensionFundId: faker.random.uuid(),
    name: faker.lorem.words(2),
    active: true,
    created: new Date(),
    modified: new Date(),
    ...pensionFund,
  }),
}
