'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const {Beats} = require('../server/db/models')
const faker = require('faker')

var randomFirstName = faker.name.firstName()
var randomLastName = faker.name.lastName()
var randomAddress = faker.address.streetAddress()

var randomEmail = faker.internet.email()

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      email: 'murphy@email.com',
      password: '123',
      firstName: 'Murphy',
      lastName: 'Santos',
      userType: 'buyer',
      address: '1200 Broadway NY NY 10038'
    }),
    User.create({
      email: randomEmail,
      password: '123',
      firstName: 'Murphy',
      lastName: 'Santos',
      userType: 'buyer',
      address: '1200 Broadway NY NY 10038'
      firstName: randomFirstName,
      lastName: randomLastName,
      address: randomAddress
    }),
    User.create({
      email: faker.internet.email(),
      password: '123',
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      address: faker.address.streetAddress()
    }),
    User.create({
      email: faker.internet.email(),
      password: '123',
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      address: faker.address.streetAddress()
    }),
    User.create({
      email: faker.internet.email(),
      password: '123',
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      address: faker.address.streetAddress()
    })
  ])

  const beats = await Promise.all([
    Beats.create({title: 'hotfire', price: 1000, rating: 4}),
    Beats.create({title: 'Summer2020', price: 1000000, rating: 5})
    Beats.create({name: 'hotfire', price: 1000, rating: 4}),
    Beats.create({name: 'Summer2020', price: 1000000, rating: 5}),
    Beats.create({name: 'Luis Miguel', price: 99, rating: 5}),
    Beats.create({name: 'Hector Lavoe', price: 75, rating: 5}),
    Beats.create({name: 'Cesar Chavez', price: 50, rating: 4})
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${beats.length} Beats`)
  console.log(`seeded successfully`)
}

// async function beatseed() {
//   await db.sync({force: true})
//   console.log('db synced!')

// }

//
// console.log(`seeded successfully`)

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
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

// async function runbeatSeed() {
//   console.log('seeding...')
//   try {
//     await beatseed()
//   } catch (err) {
//     console.error(err)
//     process.exitCode = 1
//   } finally {
//     console.log('closing db connection')
//     await db.close()
//     console.log('db connection closed')
//   }
// }

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
  // runbeatSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
