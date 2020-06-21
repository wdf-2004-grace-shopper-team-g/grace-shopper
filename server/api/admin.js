const router = require('express').Router()
const {User, Order} = require('../db/models')
const {isAdmin} = require('../api/utility')

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (err) {
    next(err)
  }
})

module.exports = router
