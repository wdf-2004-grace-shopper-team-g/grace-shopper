import axios from 'axios'

const DELETE_BEAT = 'DELETE BEAT'

const removeBeat = id => ({type: DELETE_BEAT, id})

const initialState = []

export const deleteBeat = id => {
  return async dispatch => {
    try {
      const res = await axios.delete(`/api/beats/${id}`)
      const deletedBeat = removeBeat(id)
      dispatch(deletedBeat)
    } catch (error) {
      console.log(error)
    }
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case DELETE_BEAT: {
      const newBeats = state.filter(beat => {
        if (beat.id === action.id) {
          return false
        } else {
          return true
        }
      })
      return newBeats
    }
    default:
      return state
  }
}
