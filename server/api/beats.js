const router = require('express').Router()
const {Beat} = require('../db/models/')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const beats = await Beat.findAll({
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
    let beat = await Beat.findOne({where: {id: req.params.id}})

    // console.log("this is USER***", user)
    // user = await user.getAllBeats()
    // let userBeats = await user.getAllBeats()

    // console.view("UUUUUUU: User **** ", user)
    res.json(beat)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      if (req.body) {
        const experience = await Beat.create(req.body)
        res.status(201).json(experience)
      } else {
        res.status(404).send('Beat Upload unsuccessful')
      }
    }
  } catch (error) {
    next(error)
  }
})
