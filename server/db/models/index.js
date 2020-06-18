const User = require('./user')
const Beats = require('./beats')
const Order = require('./order')
const Cart = require('./cart')
const CartItem = require('./cart-item')
const OrderItem = require('./order-item')

User.hasMany(Order)
Order.belongsTo(User)

User.hasOne(Cart)
Cart.belongsTo(User)

Cart.belongsToMany(Beats, {through: CartItem})
Beats.belongsToMany(Cart, {through: CartItem})

Order.belongsToMany(Beats, {through: OrderItem})

/**
 *
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Beats,
  Order
}
