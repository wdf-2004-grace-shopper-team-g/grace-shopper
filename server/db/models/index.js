const User = require('./user')
const Beats = require('./beats')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 * Associations:
 *
      User.hasMany(Order)
      Order.belongsTo(User)

      Order.hasMany(Beats)
      Beats.hasMany(Order)
      Order.belongsToMany(Beats, { through: "beat_order" })
      Beats.belongsToMany(Order, { through: "beat_order" })

 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Beats
}
