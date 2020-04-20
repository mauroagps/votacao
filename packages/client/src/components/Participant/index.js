import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Participant from './Participant'
import { getParticipant } from '../../store'

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.participant.isFetching,
  data: state.participant.data
    .find(item => item.id === ownProps.id)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  actions: bindActionCreators({
    getParticipant: () => getParticipant(ownProps.id)
  }, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Participant)
