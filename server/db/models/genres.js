const Sequelize = require('sequelize')
const db = require('../db')

const Genre = db.define('genres', {
  genre: {
    type: Sequelize.ENUM(
      'Rap',
      'Hip-hop',
      'Rock',
      'Blues',
      'Reggae',
      'Electric dance'
    ),
    defaultValue: 'Hip-hop'
  },
  subGenre: {
    type: Sequelize.ENUM(
      'Trap',
      'Reggaeton',
      'East Coast',
      'Underground',
      'West Cost'
    ),
    defaultValue: 'East Coast'
  },
  bpm: {
    type: Sequelize.INTEGER,
    min: 0,
    max: 300
  }
})

module.exports = Genre
