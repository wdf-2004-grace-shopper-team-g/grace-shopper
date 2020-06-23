import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const GET_SINGLEUSER = 'GET_SINGLEUSER'
const GET_ALLUSERS = 'GET_ALLUSERS'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const initialState = {
  users: []
}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const fetchAllUsers = users => ({type: GET_ALLUSERS, users})
const fetchSingleUser = user => ({type: GET_SINGLEUSER, user})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const getAllUsers = () => async dispatch => {
  try {
    const res = await axios.get('/api/users/')
    dispatch(fetchAllUsers(res.data || initialState))
  } catch (err) {
    console.error(err)
  }
}

export const getSingleUser = id => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${id}`)
    dispatch(fetchSingleUser(res.data || initialState))
  } catch (err) {
    console.error(err)
  }
}

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || initialState))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALLUSERS:
      return {...state, users: action.users}
    case GET_SINGLEUSER:
      return {...state, singleUser: action.user}
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return initialState
    default:
      return state
  }
}
