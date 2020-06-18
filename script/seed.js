'use strict'
const db = require('../server/db')
const {User, Order, OrderItem, Beats} = require('../server/db/models')
const faker = require('faker')
var randomEmail = faker.internet.email()

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    {
      email: 'murphy@email.com',
      password: '123',
      firstName: 'Murphy',
      lastName: 'Santos',
      userType: 'admin',
      address: '1200 Broadway NY NY 10038'
    },

    {
      email: randomEmail,
      password: '123',
      firstName: 'Murphy',
      lastName: 'Santos',
      userType: 'buyer',
      address: '1200 Broadway NY NY 10038'
    },

    {
      email: faker.internet.email(),
      password: '123',
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      userType: 'buyer',
      address: faker.address.streetAddress()
    },
    {
      email: faker.internet.email(),
      password: '123',
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      userType: 'buyer',
      address: faker.address.streetAddress()
    },
    {
      email: faker.internet.email(),
      password: '123',
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      userType: 'seller',
      address: faker.address.streetAddress()
    }
  ])

  const beats = await Promise.all([
    {title: 'hotfire', price: 1000, rating: 4},
    {title: 'Summer2020', price: 1000000, rating: 5},
    {title: 'Luis Miguel', price: 99, rating: 5},
    {title: 'Hector Lavoe', price: 75, rating: 5},
    {title: 'Cesar Chavez', price: 50, rating: 4}
  ])

  const orders = await Promise.all([
    {
      id: 1,
      totalPrice: 1,
      userId: 1
    },
    {
      id: 2,
      totalPrice: 2,
      userId: 2
    },
    {
      id: 3,
      totalPrice: 3,
      userId: 3
    },
    {
      id: 4,
      totalPrice: 3,
      userId: 4
    }
  ])

  const orderItems = await Promise.all([
    {
      id: 1,
      quantity: 1,
      orderId: 1,
      beatId: 1
    },
    {
      id: 2,
      quantity: 2,
      orderId: 2,
      beatId: 2
    }
  ])

  const usersInstance = await Promise.all(
    users.map(user => {
      return User.create(user)
    })
  )

  const beatsInstance = await Promise.all(
    beats.map(beat => {
      return Beats.create(beat)
    })
  )

  const ordersInstance = await Promise.all(
    orders.map(order => {
      return Order.create(order)
    })
  )

  const orderItemInstance = await Promise.all(
    orderItems.map(orderItem => {
      return OrderItem.create(orderItem)
    })
  )

  // IN CASE WE WANT TO DO MORE ASSOCIATIONS
  // console.log('ordersInstance*', ordersInstance[0].__proto__);
  // const masterProject = await robotsInstance[0].setProjects(
  //     projectsInstance[0]
  // );

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${beats.length} Beats`)
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
