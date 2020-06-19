const router = require('express').Router()
const {Beats} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const beats = await Beats.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
    })
    res.json(beats)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    // const user = await User.findByPk(req.params.id)
    let beat = await Beats.findOne({where: {id: req.params.id}})

    // console.log("this is USER***", user)
    // user = await user.getAllBeats()
    // let userBeats = await user.getAllBeats()

    // console.view("UUUUUUU: User **** ", user)
    res.json(beat)
  } catch (err) {
    next(err)
  }
})
