import { combineReducers } from 'redux'
import * as actionTypes from '../actions'

function data (state = [], action) {
  switch (action.type) {
    case actionTypes.FETCH_SURVEY_SUCCESS:
      return action.payload
    default:
      return state
  }
}

function isFetching (state = false, action) {
  switch (action.type) {
    case actionTypes.FETCH_SURVEY_REQUEST:
      return true
    case actionTypes.FETCH_SURVEY_SUCCESS:
    case actionTypes.FETCH_SURVEY_FAILURE:
      return false
    default:
      return state
  }
}

function vote (state = '', action) {
  switch (action.type) {
    case actionTypes.VOTE_SURVEY_SUCCESS:
      return action.payload.participant
    default:
      return state
  }
}

export default combineReducers({ data, vote, isFetching })
