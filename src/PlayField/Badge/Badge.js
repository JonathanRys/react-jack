import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './badge.css'

import { Container, Row, Col } from 'reactstrap';

export default class Badge extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentBet: props.currentBet
        }
    }
    render() {
        return (
            <Container className="PlayField_Badge_main">
                <Row>
                    <Col xs="6" lg="4">
                        <img className="PlayField_Badge_avatar" alt="avatar" src={this.props.avatar} />
                        <div className="PlayField_Badge_name">{this.props.name}</div>
                    </Col>
                    <Col xs="6" lg={{ size: 4, offset: 4 }}>
                        Score: {this.props.score}
                    </Col>
                </Row>
                <Row style={this.props.dealer ? { display: "none" } : { display: "flex" }}>
                    <Col xs="6" lg="4">
                        Balance: ${this.props.balance}
                    </Col>
                    <Col xs="6" lg={{ size: 4, offset: 4 }}>
                        <div className="PlayField_Badge_bet-controls"><button>-</button><button>+</button></div>
                        Current bet: ${this.state.currentBet}
                    </Col>
                </Row>
            </Container>
        )
    }
}

Badge.propTypes = {
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    score: PropTypes.number,
    balance: PropTypes.number,
    currentBet: PropTypes.number,
    dealer: PropTypes.bool.isRequired,
}
