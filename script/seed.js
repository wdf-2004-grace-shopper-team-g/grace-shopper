'use strict'
const db = require('../server/db')
const {User} = require('../server/db/models')
const {Beat} = require('../server/db/models')
const faker = require('faker')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')
  const users = await Promise.all([
    User.create({
      email: 'murphy@email.com',
      password: '123',
      firstName: 'Murphy',
      lastName: 'Santos',
      userType: 'admin',
      address: '1200 Broadway NY NY 10038'
    }),
    User.create({
      email: faker.internet.email(),
      password: '123',
      firstName: 'Murphy',
      lastName: 'Santos',
      userType: 'buyer',
      address: '1200 Broadway NY NY 10038'
    }),
    User.create({
      email: faker.internet.email(),
      password: '123',
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      userType: 'buyer',
      address: faker.address.streetAddress()
    }),
    User.create({
      email: faker.internet.email(),
      password: '123',
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      userType: 'buyer',
      address: faker.address.streetAddress()
    }),
    User.create({
      email: faker.internet.email(),
      password: '123',
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      userType: 'seller',
      address: faker.address.streetAddress()
    })
  ])
  const beats = await Promise.all([
    Beat.create({title: 'hotfire', author: 'Bob', price: 1000, rating: 4}),
    Beat.create({
      title: 'Summer2020',
      author: 'Lui',
      price: 1000000,
      rating: 5
    }),
    Beat.create({title: 'hotfire', author: 'John', price: 1000, rating: 4}),
    Beat.create({
      title: 'Summer2020',
      author: 'Criag',
      price: 1000000,
      rating: 5
    }),
    Beat.create({title: 'Luis Miguel', author: 'Osee', price: 99, rating: 5}),
    Beat.create({title: 'Hector Lavoe', author: 'Foun', price: 75, rating: 5}),
    Beat.create({title: 'Cesar Chavez', author: 'Oros', price: 50, rating: 4})
  ])
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${beats.length} Beat`)
  console.log(`seeded successfully`)
}

async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
  // runbeatSeed()
}
// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
