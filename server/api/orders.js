/*


user add an item

req  is send to backend
  check if user has a cart = uncomplete order

  check if order is on state  if not fetch db  using findOrCreate() {
    this will return uncomplete order
    when submit order include( userId, productId, quantity, totalPrice)  {
      here we can use eager loading
    }
  }

  ROUTES:
    - const cart  = getCart() // view cart  => findOrCreate save on redux; at this point we have an order to be send through the thunk to the backend
         returns cart
           eager loading
           Order.findAll({
             where:  userId
           })
      - addItemToCart() { //POST
          REQ.PARAMS.BEATID => cart/beatId
          find the instance of the beat
          find the cart
          add beat to cart (using magic methods)
          cart.add(Beats(beatId))

      }

*/

/*
i need to make a route to get
orderId =  userId  to get the order where order.completed == false (findOrCreate) 1
allItems = getOrderItems by orderId and include itemInfo
[1,2,3] => [
  {
    title,
    author,
    descrip
  }
]


guest:
   check if(userCart) => findorCreate()
order model userId  to be null
createCart(userID)

if u are not loggin then save it  to local Storage
as soon as u want to add something to the card

guest have something in card
*/

const router = require('express').Router()
const {OrderItem, Beat, Order} = require('../db/models')
const models = require('../db/models')
module.exports = router

// http://localhost:8080/api/orders/1
router.get('/:userId', async (req, res, next) => {
  try {
    const orders = await Order.findOne({
      where: {
        id: req.params.userId,
        status: 'Created'
      },
      include: {model: Beat}
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.post('/:userId', async (req, res, next) => {
  try {
    let created = await Order.findOrCreate({
      where: {id: req.params.userId, completed: false},
      defaults: {
        totalPrice: 99,
        userId: 2
      }
    }).spread((user, created) => {
      return created
    })
    if (created) {
      res.json('Cart was succesfully created!!')
    }
  } catch (err) {
    console.log(`ERROR! => ${err.name}: ${err.message}`)
    res.status(500).send(err.message)
  }
})

// to add a beat to the cart, i need to think about it how to remove, check JP final proj => remove task from robot
// to avoid dup have a condition=> if(beatId in order) { return 'Already added to cart' }
//  else order.addBeat(beatId)
router.put('/:userId', async (req, res, next) => {
  const {id, type} = req.body
  try {
    const order = await Order.findOne({
      where: {
        id: req.params.userId,
        status: 'Created'
      }
    })

    if (type === 'removed') {
      let removed = await order.removeBeat(id)
      let numbOfBeats = await order.countBeats()
      if (removed) {
        res.send({
          message: 'Removed Successfully',
          numbOfBeats: numbOfBeats
        })
      } else {
        res.send('Failed or not founded!')
      }
    } else {
      let added = await order.addBeat(id)
      let numbOfBeats = await order.countBeats()
      if (added) {
        res.send({
          message: 'Added Successfully',
          numbOfBeats: numbOfBeats
        })
      } else {
        res.send('Already added!')
      }
    }
    // returns numbersOfBeat in the order

    //  let added = await order.addBeat(1)

    // let message = "Failed!"
    // if(type === "remove") {
    //   await  order.removeBeat(id);
    //   message= `Beat with id ${id} was succesfully removed!!`
    // }
    // else {
    //   console.log("OUTPUT: res**************")
    //   let res = await order.addBeat(id)

    //   console.log("OUTPUT: order", order.__proto__)
    //   if(res) {
    //     message =`Beat with id ${id} was succesfully added!!`
    //   }
    // }
    // res.send(message)
  } catch (error) {
    next(error)
  }
})

// router.get('/:userId',  (req, res, next) => {
//   const obj = {totalPrice: 99, userId: 2}
//   Order.findOrCreate({

//             where: {
//               id: req.params.userId,
//               completed: false
//             },
//             transaction: obj
//    } )
//   .success(function(order, created){
//       console.log(order.values);
//       res.send(created);
//   })
//   .error(function(err){
//     console.log('Error occured' + err);
//   })
// })

// router.get('/:id',  (req, res, next) => {
//   try {
//     const obj = {
//       totalPrice: 99,
//       beatId: 4,
//     }
//     return Order.findOrCreate({
//       where: {
//         id: req.params.userId,
//         completed: false
//       },
//       transaction: obj
//     })
//     .spread(function(orderResult, created){
//       // userResult is the user instance
//       if (created) {
//         res.json(created)
//         // created will be true if a new user was created

//       }
//     })
//   } catch (err) {
//     next(err)
//   }
// })
