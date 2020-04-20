import { combineReducers } from 'redux'
import * as actionTypes from '../actions'

function data (state = [], action) {
  switch (action.type) {
    case actionTypes.FETCH_PARTICIPANT_SUCCESS:
      return state
        .filter(item => item.id !== action.payload.id)
        .concat(action.payload)
    default:
      return state
  }
}

function isFetching (state = false, action) {
  switch (action.type) {
    case actionTypes.FETCH_PARTICIPANT_REQUEST:
      return true
    case actionTypes.FETCH_PARTICIPANT_SUCCESS:
    case actionTypes.FETCH_PARTICIPANT_FAILURE:
      return false
    default:
      return state
  }
}

export default combineReducers({ data, isFetching })
