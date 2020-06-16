'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const {Beats} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const beats = await Promise.all([
    Beats.create({name: 'hotfire', price: 1000, rating: 4}),
    Beats.create({name: 'Summer2020', price: 1000000, rating: 5})
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
