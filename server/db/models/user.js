const crypto = require('crypto')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const db = require('../db')
const Beats = require('./beats')
const Order = require('./order')

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password')
    }
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt')
    }
  },
  googleId: {
    type: Sequelize.STRING
  }
})

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

User.prototype.getAllBeats = async function() {
  const orders = await Order.findAll({
    where: {userId: this.id}
  })

  console.log('this is ORDERS****', orders)

  // arrOfBeats
  const arrOrderId = []
  let curOrderId
  // console.log('this is MODELS!', db.models)
  for (let i = 0; i < orders.length; i++) {
    curOrderId = orders[i].dataValues.id
    // console.log('this is current order id******', curOrderId)
    arrOrderId.push(curOrderId)
  }

  const beatOrders = await db.models.beat_order.findAll({
    where: {
      orderId: {

        [Op.in]: arrOrderId
      }
    }
  })
}

/**
 * classMethods
 */
User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
User.beforeBulkCreate(users => {
  users.forEach(setSaltAndPassword)
})

module.exports = User
