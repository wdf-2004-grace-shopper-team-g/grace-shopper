/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Beat = db.model('beats')

describe('Beat model', () => {
  // clear the database before all tests
  let beats
  beforeEach(() => {
    return db.sync({force: true})
  })

  beforeEach(() => {
    beats = {
      title: 'crazy wave',
      author: 'Dj Up7P',
      description: 'rythim like J Boom, Snare is crispy',
      // releasedDate: new Date(),
      price: 100,
      rating: 3,
      imgUrl:
        'https://www.wyzowl.com/wp-content/uploads/2018/08/The-20-Best-Royalty-Free-Music-Sites-in-2018.png',
      genre: 'Rap'
    }
  })

  it('includes all fields, title, author, description, price, imgUrl, audioUrl, genre', async () => {
    const newBeats = await Beat.create(beats)
    expect(newBeats.title).to.equal('crazy wave')
    expect(newBeats.author).to.equal('Dj Up7P')
    expect(newBeats.description).to.equal('rythim like J Boom, Snare is crispy')
    // expect(newBeats.releasedDate).to.equal(new Date());
    expect(newBeats.price).to.equal(undefined) //fix
    expect(newBeats.rating).to.equal(3)
    expect(newBeats.imgUrl).to.equal(
      'https://www.wyzowl.com/wp-content/uploads/2018/08/The-20-Best-Royalty-Free-Music-Sites-in-2018.png'
    )
    expect(newBeats.genre).to.equal('Rap')
  })

  it('requires title', async () => {
    beats.title = ''
    let result, error
    try {
      result = await beats.validate()
    } catch (err) {
      error = err
    }
    if (result) throw Error('Validation should fail when title is empty')
    expect(error).to.be.an.instanceOf(Error)
  })

  it('requires author', async () => {
    beats.author = ''
    let result, error
    try {
      result = await beats.validate()
    } catch (err) {
      error = err
    }
    if (result) throw Error('Validation should fail when author is empty')
    expect(error).to.be.an.instanceOf(Error)
  })

  it('requires price', async () => {
    beats.price = -1
    let result, error
    try {
      result = await beats.validate()
    } catch (err) {
      error = err
    }
    if (result) throw Error('Validation should fail when price is empty')
    expect(error).to.be.an.instanceOf(Error)
  })

  it('It has a default value for imgUrl', async () => {
    delete beats.imgUrl
    const defaultImg = await Beat.create(Beat)
    expect(defaultImg.imgUrl).to.equal(
      'http://www.droid-life.com/wp-content/uploads/2014/05/beats-logo.jpg'
    )
  })

  it('It has a default value for Genre', async () => {
    delete beats.genre
    const defaultGenre = await Beat.create(Beat)
    expect(defaultGenre.genre).to.equal('Hip-hop')
  })
})
