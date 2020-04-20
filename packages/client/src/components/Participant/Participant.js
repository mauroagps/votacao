import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { Container as BaseContainer, Row, Col } from 'reactstrap'

const Container = styled(BaseContainer)`
  & h5 {
    text-align: center;
  }

  & img {
    width: 100%;
    height: 100%;
  }

  ${props => props.isSelectedItem && css`
    outline: 3px solid orange;
  `}
`

export default class Participant extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    onClick: PropTypes.func
  }

  static defaultProps = {
    onClick: () => {}
  }

  componentDidMount () {
    this.props.actions.getParticipant()
  }

  render () {
    const { isFetching, data, ...ownProps } = this.props

    if (isFetching || !data) {
      return (
        <p>carregando...</p>
      )
    }

    return (
      <Container {...ownProps} onClick={this.props.onClick}>
        <Row>
          <Col>
            <h5>{data.name}</h5>
          </Col>
        </Row>
        <Row>
          <Col>
            <img
              src={data.photo}
              alt={data.id}
            />
          </Col>
        </Row>
      </Container>
    )
  }
}
