import React from 'react'
import { Provider } from 'react-redux'
import { configureStore } from './store'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { SurveyVote, SurveyReport } from './views'

export default function App () {
  const store = configureStore()

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path='/status' component={SurveyReport} />
          <Route path='/' component={SurveyVote} />
        </Switch>
      </Router>
    </Provider>
  )
}
