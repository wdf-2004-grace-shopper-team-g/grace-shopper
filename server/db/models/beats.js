const Sequelize = require('sequelize')
const db = require('../db')

const Beats = db.define('beats', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  author: {
    type: Sequelize.STRING
  },
  releasedDate: {
    type: Sequelize.DataTypes.DATEONLY
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      isNumeric: true
    }
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 5
    }
  },
  imgUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'http://www.droid-life.com/wp-content/uploads/2014/05/beats-logo.jpg'
  },
  audioUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'http://soundbible.com/mp3/Depth%20Charge%20Short-SoundBible.com-1303947570.mp3'
  },
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
  }
})

module.exports = Beats
