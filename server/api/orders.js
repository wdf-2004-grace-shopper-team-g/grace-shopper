const router = require('express').Router()
const {OrderItem, Beat, Order} = require('../db/models')
const models = require('../db/models')
module.exports = router

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
  } catch (error) {
    next(error)
  }
})
