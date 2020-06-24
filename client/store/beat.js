import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALLBEATS = 'GET_ALLBEATS'
const GET_SINGLEBEAT = 'GET_SINGLEBEAT'
const ADD_BEAT = 'ADD_BEAT'
const EDIT_BEAT = 'EDIT_BEAT'

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
const addBeat = beat => ({type: ADD_BEAT, beat})
const editedBeat = beat => ({type: EDIT_BEAT, beat})

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
}

export const getAllBeats = () => async dispatch => {
  try {
    const res = await axios.get(`/api/beats/`)
    dispatch(fetchAllBeats(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const updateBeat = (beat, id) => async dispatch => {
  try {
    const res = await axios.put(`/api/beats/${id}`, beat)
    const newBeat = fetchSingleBeat(res.data)
    dispatch(editedBeat(newBeat))
  } catch (err) {
    console.error(err)
  }
}

export const setBeat = beat => async dispatch => {
  try {
    const res = await axios.post(`/api/beats/`, beat)
    const newBeat = addBeat(res.data)
    dispatch(newBeat)
  } catch (err) {
    console.error(err)
  }
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
    case ADD_BEAT:
      return {...state, beat: action.beat}
    case EDIT_BEAT:
      return {...state, beat: action.beat}
    default:
      return state
  }
}
