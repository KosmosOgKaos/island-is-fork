const faker = require('faker')

module.exports = {
  getGenericUnion: (union) => ({
    union_id: faker.random.uuid(),
    name: faker.lorem.words(2),
    active: true,
    created: new Date(),
    modified: new Date(),
    ...union,
  }),
}
