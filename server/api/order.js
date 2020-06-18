/*

user add an item

req  is send to backend
  check if user has a cart = uncomplete order

  check if order is on state  if not fetch db  using findOrCreate() {
    this will return uncomplete order
    when submit order include( userId, productId, quantity, totalPrice)  {
      here we can use eager loading
    }
  }

  ROUTES:
    - const cart  = getCart() // view cart  => findOrCreate save on redux; at this point we have an order to be send through the thunk to the backend
         returns cart
           eager loading
           Order.findAll({
             where:  userId
           })
      - addItemToCart() { //POST
          REQ.PARAMS.BEATID => cart/beatId
          find the instance of the beat
          find the cart
          add beat to cart (using magic methods)
          cart.add(Beats(beatId))

      }

*/
