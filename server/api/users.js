const router = require('express').Router()
const {User, Order} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      // attributes: ['id', 'email']
      include: [{model: Order}]
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    // const user = await User.findByPk(req.params.id)
    let user = await User.findOne({where: {id: req.params.id}})

    // console.log("this is USER***", user)
    // user = await user.getAllBeats()
    // let userBeats = await user.getAllBeats()

    // console.view("UUUUUUU: User **** ", user)
    res.json({user})
  } catch (err) {
    next(err)
  }
})
