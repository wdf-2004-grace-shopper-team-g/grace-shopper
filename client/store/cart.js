import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const REMOVE_CART = 'REMOVE_CART'

const defaultCart = {}

const getCart = cart => ({type: GET_CART, cart})
const removeCart = () => ({type: REMOVE_CART})

export const fetchCart = userId => {
  return async dispatch => {
    const {data} = await axios.get(`/api/orders/${userId}`)
    dispatch(getCart(data))
  }
}
// export const logout = () => async dispatch => {
//   try {
//     await axios.post('/auth/logout')
//     dispatch(removeUser())
//     history.push('/login')
//   } catch (err) {
//     console.error(err)
//   }
// }

export default function(state = defaultCart, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    // case REMOVE_USER:
    //   return defaultUser
    default:
      return state
  }
}
