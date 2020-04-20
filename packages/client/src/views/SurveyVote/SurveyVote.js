import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import { Participant as BaseParticipant } from '../../components'
import Recaptcha from 'react-recaptcha'
import styled from 'styled-components'

const Participant = styled(BaseParticipant)`
  &:hover {
    outline: 3px solid orange;
  }
`

export default class SurveyVote extends Component {
  state = {
    recaptcha: null,
    participant: null
  }

  componentDidMount () {
    this.props.actions.fetchSurvey()
  }

  verifyCallback = (recaptcha) => {
    this.setState({ recaptcha })
  }

  selectParticipant = (participant) => {
    this.setState({ participant })
  }

  voteIntoParticipant = (data) => {
    this.props.actions.voteIntoParticipant(data)
      .then(() => this.props.history.push('/status'))
  }

  render () {
    const { isFetching, data: [ data ] } = this.props
    const { recaptcha, participant } = this.state
    const isDisabledButton = (
      recaptcha === null ||
      participant === null
    )

    if (isFetching || !data) {
      return (
        <div />
      )
    }

    return (
      <Container>
        <Row>
          {Object.keys(data.peerParticipants).map((id, index) => (
            <Col key={index}>
              <Participant
                isSelectedItem={participant === id}
                id={id}
                onClick={() => this.selectParticipant(id)}
              />
            </Col>
          ))}
        </Row>
        <Row>
          <Col>
            <Recaptcha
              render='explicit'
              verifyCallback={this.verifyCallback}
              sitekey='6LcBeKAUAAAAAKGTe9eYNRDQC6lLaLH67OYjj4HR'
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              color='success'
              disabled={isDisabledButton}
              onClick={() => this.voteIntoParticipant({ ...this.state, survey: data.id })}>
              Votar
            </Button>
          </Col>
        </Row>
      </Container>
    )
  }
}
