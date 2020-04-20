import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'
import thunk from 'redux-thunk'

const enhancer = [
  thunk
]

export function configureStore (initialState = {}) {
  return createStore(reducers, initialState, applyMiddleware(...enhancer))
}

export * from './actions'
