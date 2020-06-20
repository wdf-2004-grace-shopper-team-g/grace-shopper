const User = require('./user')
const Beat = require('./beats')
const Order = require('./order')
const OrderItem = require('./order-item')

User.hasMany(Order)
Order.belongsTo(User)
Order.belongsToMany(Beat, {through: OrderItem})
Beat.belongsToMany(Order, {through: OrderItem})

// User.hasMany(Order)
// Order.belongsTo(User)

// User.hasOne(Cart)
// Cart.belongsTo(User)

// <<<<<<< HEAD
// Cart.belongsToMany(Beat, {through: CartItem})
// Beat.belongsToMany(Cart, {through: CartItem})

// Order.belongsToMany(Beat, {through: OrderItem})
// =======
// Cart.belongsToMany(Beats, {through: CartItem})
// Beats.belongsToMany(Cart, {through: CartItem})

// Order.belongsToMany(Beat, {through: OrderItem})
// Beat.belongsToMany(Order, {through: OrderItem})

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
  Beat,
  Order,
  OrderItem
}
