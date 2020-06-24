'use strict'
const db = require('../server/db')
const {User, Order, OrderItem, Beat} = require('../server/db/models')
const faker = require('faker')

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
      address: '1200 Broadway NY NY 10038',
      isAdmin: true
    },
    {
      email: 'Luis@email.com',
      password: '123',
      firstName: 'Luis',
      lastName: 'Carbajal',
      userType: 'buyer',
      imgUrl:
        'https://avatars0.githubusercontent.com/u/10853211?s=460&u=d2de16242cc1a3ce307d8902e807f774371654e9&v=4',
      address: '1200 Broadway NY NY 10038'
    },

    {
      email: faker.internet.email(),
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
    {
      title: 'Hotfire',
      author: faker.name.findName(),
      description: faker.lorem.sentences(),
      releasedDate: faker.date.past(),
      price: 1000,
      rating: 4,
      imgUrl:
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.visitrenotahoe.com%2Fwp-content%2Fuploads%2F2017%2F07%2F0006_live-music.jpg&f=1&nofb=1',
      audioUrl:
        'http://soundbible.com/mp3/Depth%20Charge%20Short-SoundBible.com-1303947570.mp3'
    },
    {
      title: 'Summer 2020',
      author: faker.name.findName(),
      description: faker.lorem.sentences(),
      releasedDate: faker.date.past(),
      price: 105,
      rating: 5,
      imgUrl:
        'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fimages5.fanpop.com%2Fimage%2Fphotos%2F27400000%2FMusic-music-27454281-1024-768.jpg&f=1&nofb=1',
      audioUrl:
        'http://soundbible.com/mp3/Depth%20Charge%20Short-SoundBible.com-1303947570.mp3'
    },
    {
      title: 'Let it go',
      author: faker.name.findName(),
      description: faker.lorem.sentences(),
      releasedDate: faker.date.past(),
      price: 9050,
      rating: 5,
      imgUrl: 'https://i.ytimg.com/vi/QMZrnCGQlCA/maxresdefault.jpg',
      audioUrl:
        'http://soundbible.com/mp3/Depth%20Charge%20Short-SoundBible.com-1303947570.mp3'
    },
    {
      title: 'Hector Lavo',
      author: faker.name.findName(),
      description: faker.lorem.sentences(),
      releasedDate: faker.date.past(),
      price: 2050,
      rating: 5,
      imgUrl:
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FWI1xExDWVF0%2Fmaxresdefault.jpg&f=1&nofb=1',
      audioUrl:
        'http://soundbible.com/mp3/Depth%20Charge%20Short-SoundBible.com-1303947570.mp3'
    },
    {
      title: 'Cesar Chavez',
      author: faker.name.findName(),
      description: faker.lorem.sentences(),
      releasedDate: faker.date.past(),
      price: 3050,
      rating: 5,
      imgUrl:
        'http://static5.comicvine.com/uploads/original/10/100555/3076403-05.jpg',
      audioUrl:
        'http://soundbible.com/mp3/Depth%20Charge%20Short-SoundBible.com-1303947570.mp3'
    }
  ])

  const orders = await Promise.all([
    {
      id: 1,
      items: [1, 2, 3, 4, 5],
      buyersName: faker.name.findName(),
      buyersAddress: faker.address.streetAddress(),
      userId: 1
    },
    {
      id: 2,
      items: [1, 2, 3],
      buyersName: faker.name.findName(),
      buyersAddress: faker.address.streetAddress(),
      userId: 2
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
      quantity: 1,
      orderId: 1,
      beatId: 2
    },
    {
      id: 3,
      quantity: 1,
      orderId: 1,
      beatId: 3
    },
    {
      id: 4,
      quantity: 1,
      orderId: 1,
      beatId: 4
    },
    {
      id: 5,
      quantity: 1,
      orderId: 1,
      beatId: 5
    },

    // orders for Luis
    {
      id: 6,
      quantity: 1,
      orderId: 2,
      beatId: 1
    },

    {
      id: 7,
      quantity: 1,
      orderId: 2,
      beatId: 2
    },

    {
      id: 8,
      quantity: 1,
      orderId: 2,
      beatId: 3
    },
    {
      id: 9,
      quantity: 1,
      orderId: 2,
      beatId: 4
    }
  ])

  const usersInstance = await Promise.all(
    users.map(user => {
      return User.create(user)
    })
  )

  const beatsInstance = await Promise.all(
    beats.map(beat => {
      return Beat.create(beat)
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

  // console.log("OUTPUT: seed -> OrderItem", OrderItem.__proto__)

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
