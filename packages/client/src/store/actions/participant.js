export const FETCH_PARTICIPANT_REQUEST = 'FETCH_PARTICIPANT_REQUEST'
export const FETCH_PARTICIPANT_SUCCESS = 'FETCH_PARTICIPANT_SUCCESS'
export const FETCH_PARTICIPANT_FAILURE = 'FETCH_PARTICIPANT_FAILURE'

export function getParticipant (id) {
  return async (dispatch) => {
    try {
      dispatch({ type: FETCH_PARTICIPANT_REQUEST })

      const response = await fetch(`/api/participant/${id}`)

      const payload = await response.json()

      dispatch({
        type: FETCH_PARTICIPANT_SUCCESS,
        payload
      })
    } catch (error) {
      dispatch({ type: FETCH_PARTICIPANT_FAILURE, error })
    }
  }
}
