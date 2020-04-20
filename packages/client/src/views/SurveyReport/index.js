import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchSurvey, getParticipant } from '../../store'
import SurveyReport from './SurveyReport'

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.survey.isFetching && state.participant.isFetching,
  survey: {
    vote: state.survey.vote,
    isFetching: state.survey.isFetching,
    data: state.survey.data[0] || {}
  },
  participant: {
    data: state.participant.data,
    isFetching: state.participant.isFetching
  }
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  actions: bindActionCreators({
    fetchSurvey,
    getParticipant
  }, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SurveyReport)
