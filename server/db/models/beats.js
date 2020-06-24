const Sequelize = require('sequelize')
const db = require('../db')

const Beat = db.define('beats', {
  title: {
    type: Sequelize.STRING,
    notEmpty: true
  },
  author: {
    type: Sequelize.STRING,
    notEmpty: true
  },
  description: {
    type: Sequelize.TEXT
  },
  releasedDate: {
    type: Sequelize.DataTypes.DATEONLY
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
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
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.visitrenotahoe.com%2Fwp-content%2Fuploads%2F2017%2F07%2F0006_live-music.jpg&f=1&nofb=1'
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

module.exports = Beat
