/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Order = db.model('orders')

describe('Order Model', () => {
  let orders

  beforeEach(() => {
    return db.sync({force: true})
  })

  beforeEach(() => {
    orders = {
      status: 'Created',
      items: ['Hot Summer'],
      buyersName: 'Bob',
      buyersAddress: '123 St. Manhatan, Ny Ny'
    }
  })

  it('Includes the fields of status, items, buyersName, buyersAddress', async () => {
    const newOrdes = await Order.create(orders)
    expect(newOrdes.status).to.equal('Created')
    expect(newOrdes.items).to.be.an('array')
    expect(newOrdes.buyersName).to.equal('Bob')
    expect(newOrdes.buyersAddress).to.equal('123 St. Manhatan, Ny Ny')
  })
})
