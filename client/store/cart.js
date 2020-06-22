import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const REMOVE_BEAT_IN_CART = 'REMOVE_BEAT_IN_CART'
const REMOVE_BEAT_BY_ID = 'REMOVE_BEAT_BY_ID'
const REMOVE_CART = 'REMOVE_CART'

const defaultCart = {
  cart: {},
  isRemoved: {},
  totalBeats: 0
}

const getCart = cart => ({type: GET_CART, cart})
const removeBeatById = beatToRemove => ({type: REMOVE_BEAT_BY_ID, beatToRemove})
const getRemoveBeat = isRemoved => ({type: REMOVE_BEAT_IN_CART, isRemoved})

export const fetchCart = userId => {
  return async dispatch => {
    const {data} = await axios.get(`/api/orders/${userId}`)
    dispatch(getCart(data))
  }
}

export const removeBeat = (userId, beatId) => {
  const targetObj = {id: beatId, type: 'removed'}
  return async dispatch => {
    const {data} = await axios.put(`/api/orders/${userId}`, targetObj)
    if (data.message) {
      dispatch(fetchCart(userId))
    }
  }
}

export const addBeatToCart = (userId, beatId) => {
  const targetObj = {id: beatId, type: 'add'}
  return async dispatch => {
    const {data} = await axios.put(`/api/orders/${userId}`, targetObj)
    if (data.message) {
      dispatch(fetchCart(userId))
    }
  }
}

export default function(state = defaultCart, action) {
  switch (action.type) {
    case GET_CART:
      let total = 0
      action.cart.beats.map(beat => {
        total += beat.price
      })
      return {
        ...state,
        cart: {...action.cart, totalPrice: total},
        totalBeats: action.cart.beats.length
      }
    case REMOVE_BEAT_BY_ID:
      return {
        ...state,
        cart: {
          ...state,
          ...state.cart.beats.filter(beat => beat.id != action.beatToRemove)
        }
      }
    case REMOVE_BEAT_IN_CART:
      return {...state, isRemoved: action.removeBeat}
    default:
      return state
  }
}
