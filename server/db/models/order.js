const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('orders', {
  status: {
    type: Sequelize.ENUM('Created', 'Canceled', 'Completed'),
    defaultValue: 'Created'
  },
  items: {
    type: Sequelize.ARRAY(Sequelize.JSON)
  },
  buyersName: {
    type: Sequelize.STRING,
    notEmpty: true
  },
  buyersAddress: {
    type: Sequelize.TEXT,
    notEmpty: true
  }
})

module.exports = Order
