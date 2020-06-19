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
orderId =  userId  to get the order where order.completed == false (findOrCreate)
allItems = getOrderItems by orderId and include itemInfo
[1,2,3] => [
  {
    title,
    author,
    descrip
  }
]



*/

const router = require('express').Router()
const {Order} = require('../db/models')
const {OrderItem} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        id: 1
      }
    })
    res.json(orders)

    // try {
    //   // const orders = await Order.findAll({
    //   //   where: {
    //   //     id: 1
    //   //   }
    //   // })
    //   const orders = await Order.findAll()
    //   res.json(orders)
  } catch (err) {
    next(err)
  }
})

// router.get('/:id', async (req, res, next) => {
//   try {
//     // const user = await User.findByPk(req.params.id)
//     let user = await User.findOne({where: {id: req.params.id}})

//     // console.log("this is USER***", user)
//     // user = await user.getAllBeats()
//     // let userBeats = await user.getAllBeats()

//     // console.view("UUUUUUU: User **** ", user)
//     res.json({user})
//   } catch (err) {
//     next(err)
//   }
// })
