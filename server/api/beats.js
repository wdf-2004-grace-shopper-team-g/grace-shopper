const router = require('express').Router()
const {Beat} = require('../db/models/')
const {isAdmin, isUser} = require('./utility')
module.exports = router

router.get('/', async (req, res, next) => {
  // router.get('/', isAdmin, async (req, res, next) => {
  try {
    const beats = await Beat.findAll({
      order: [['updatedAt', 'DESC']]
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
    })
    res.json(beats)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', isAdmin, async (req, res, next) => {
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

router.post('/', isAdmin, async (req, res, next) => {
  try {
    if (req.body) {
      const newBeat = await Beat.create(req.body)
      res.status(201).json(newBeat)
    } else {
      res.status(404).send('Beat Upload unsuccessful')
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const beatId = req.params.id
    const beat = await Beat.findOne({
      where: {
        id: beatId
      }
    })
    const updatedBeat = await beat.update(req.body)

    res.json(updatedBeat)
  } catch (error) {
    next(error)
  }
})
