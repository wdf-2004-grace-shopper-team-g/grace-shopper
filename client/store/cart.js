import axios from 'axios'

const GET_CART = 'GET_CART'
const REMOVE_BEAT_IN_CART = 'REMOVE_BEAT_IN_CART'
const COMPLETE_ORDER = 'COMPLETE_ORDER'
const EMPTY_CART = 'EMPTY_CART'

const defaultCart = {
  cart: {},
  isRemoved: {},
  totalBeats: 0
}

const getCart = cart => ({type: GET_CART, cart})
const getRemoveBeat = isRemoved => ({type: REMOVE_BEAT_IN_CART, isRemoved})
const emptyCart = () => ({type: EMPTY_CART})

export const fetchCart = userId => {
  return async dispatch => {
    const {data} = await axios.get(`/api/orders/${userId}`)
    dispatch(getCart(data))
  }
}

export const completeOrder = (userId, targetObj) => {
  return async dispatch => {
    const {data} = await axios.put(`/api/orders/posting/${userId}`, targetObj)
    if (data.message) {
      dispatch(fetchCart(userId))
    }
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
    case REMOVE_BEAT_IN_CART:
      return {...state, isRemoved: action.removeBeat}
    default:
      return state
  }
}
