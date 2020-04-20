import qs from 'querystring'

export const FETCH_SURVEY_REQUEST = 'FETCH_SURVEY_REQUEST'
export const FETCH_SURVEY_SUCCESS = 'FETCH_SURVEY_SUCCESS'
export const FETCH_SURVEY_FAILURE = 'FETCH_SURVEY_FAILURE'
export const VOTE_SURVEY_REQUEST = 'VOTE_SURVEY_REQUEST'
export const VOTE_SURVEY_SUCCESS = 'VOTE_SURVEY_SUCCESS'
export const VOTE_SURVEY_FAILURE = 'VOTE_SURVEY_FAILURE'

export function fetchSurvey () {
  return async (dispatch) => {
    try {
      dispatch({ type: FETCH_SURVEY_REQUEST })

      const response = await fetch('/api/survey')
      const payload = await response.json()

      dispatch({
        type: FETCH_SURVEY_SUCCESS,
        payload
      })
    } catch (error) {
      dispatch({ type: FETCH_SURVEY_FAILURE, error })
    }
  }
}

export function voteIntoParticipant (data) {
  return async dispatch => {
    /**
     * @type {RequestInit}
     */
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: qs.stringify(data)
    }

    try {
      dispatch({ type: VOTE_SURVEY_REQUEST })

      const response = await fetch('/api/survey', options)

      const id = await response.json()

      dispatch({
        type: VOTE_SURVEY_SUCCESS,
        payload: {
          id,
          participant: data.participant
        }
      })
    } catch (error) {
      dispatch({ type: VOTE_SURVEY_FAILURE, error })
    }
  }
}
