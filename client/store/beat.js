import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALLBEATS = 'GET_ALLBEATS'
const GET_SINGLEBEAT = 'GET_SINGLEBEAT'

// const REMOVE_BEAT = 'REMOVE_BEAT'

/**
 * INITIAL STATE
 */
const initialState = {
  singleBeat: {},
  multipleBeats: []
}

/**
 * ACTION CREATORS
 */
const fetchSingleBeat = beat => ({type: GET_SINGLEBEAT, beat})
const fetchAllBeats = beats => ({type: GET_ALLBEATS, beats})

/**
 * THUNK CREATORS
 */
export const getSingleBeat = id => async dispatch => {
  try {
    const res = await axios.get(`/api/beats/${id}`)
    dispatch(fetchSingleBeat(res.data))
  } catch (err) {
    console.error(err)
  }
  console.log('Hey I am here!')
}

export const getAllBeats = () => async dispatch => {
  try {
    const res = await axios.get(`/api/beats/`)
    dispatch(fetchAllBeats(res.data))
  } catch (err) {
    console.error(err)
  }
  console.log('Hey I am here 2!')
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLEBEAT:
      return {...state, beat: action.beat}
    case GET_ALLBEATS:
      return {...state, beats: action.beats}
    default:
      return state
  }
}
