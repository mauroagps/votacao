import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Participant } from '../../components'
import moment from 'moment'

export default class SurveyReport extends Component {
  state = {
    finishAt: ''
  }

  componentDidMount () {
    setTimeout(() => {
      this.props.actions.fetchSurvey().finally(() => {
        for (const participantId of Object.keys(this.props.survey.data.peerParticipants)) {
          this.props.actions.getParticipant(participantId)
        }
      })

      setInterval(() => {
        this.setState({
          finishAt: moment(this.props.survey.data.finishAt * 1000)
            .format('DD/MM [as] HH:mm')
        })
      }, 1000)
    }, 1000)
  }

  render () {
    const { isFetching, survey, participant } = this.props
    const { finishAt } = this.state

    if (isFetching) {
      return (
        <div />
      )
    }

    const selectedParticipant = participant.data
      .find(participant => survey.vote === participant.id)

    return (
      <Container>
        <Row>
          <Col>
            <a href='/'>Votar novamente</a>
          </Col>
        </Row>
        {selectedParticipant && (
          <Row>
            <Col>
              <h5>Parabens seu voto para o {selectedParticipant.name} foi enviado com sucesso!</h5>
            </Col>
          </Row>
        )}
        <Row>
          {participant.data.map((participant, index) => (
            <Col key={index}>
              <Participant id={participant.id} />
              <h5 style={{ textAlign: 'center' }}>
                {parseInt((survey.data.peerParticipants[participant.id] * 100) / survey.data.total)}%
              </h5>
            </Col>
          ))}
        </Row>
        <Row>
          <Col>
            <p>{finishAt}</p>
          </Col>
        </Row>
      </Container>
    )
  }
}
