import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchSurvey, voteIntoParticipant } from '../../store'
import SurveyVote from './SurveyVote'

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.survey.isFetching,
  data: state.survey.data
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  actions: bindActionCreators({
    fetchSurvey,
    voteIntoParticipant
  }, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SurveyVote)
