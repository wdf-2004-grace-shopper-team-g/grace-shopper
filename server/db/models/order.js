const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('orders', {
  item: {
    type: Sequelize.TEXT
  }
})

module.exports = Order
