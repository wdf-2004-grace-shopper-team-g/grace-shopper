const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('orders', {
  totalPrice: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Order
