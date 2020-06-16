const Sequelize = require('sequelize')
const db = require('../db')

const Beats = db.define('beats', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
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
  }
})

module.exports = Beats
