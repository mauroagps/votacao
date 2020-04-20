import { combineReducers } from 'redux'
import participant from './participant'
import survey from './survey'

export default combineReducers({
  survey,
  participant
})
