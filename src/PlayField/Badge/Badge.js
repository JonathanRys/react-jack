import React, { Component } from "react";
import PropTypes from "prop-types";

import "./badge.css";

import FontAwesome from "react-fontawesome";
import { Container, Row, Col } from "reactstrap";

const MIN_BET = 5;

export default class Badge extends Component {
  onIncrement = () => {
    this.props.setBet(this.props.currentBet + 1);
  };

  onDecrement = () => {
    this.props.setBet(this.props.currentBet - 1);
  };

  render() {
    return (
      <Container className="PlayField_Badge_main">
        <Row>
          <Col xs="6" lg="4">
            <img
              className="PlayField_Badge_avatar"
              alt="avatar"
              src={this.props.avatar}
            />
            <div className="PlayField_Badge_name">{this.props.name}</div>
          </Col>
          <Col xs="6" lg={{ size: 4, offset: 4 }}>
            Score:{" "}
            {this.props.dealer && !this.props.flipped ? null : this.props.score}
          </Col>
        </Row>
        <Row
          style={this.props.dealer ? { display: "none" } : { display: "flex" }}
        >
          <Col xs="6" lg="4">
            Balance: ${this.props.balance}
          </Col>
          <Col
            xs="6"
            lg={{ size: 4, offset: 4 }}
            className="PlayField_Badge_betting-main"
          >
            <div className="PlayField_Badge_bet-controls">
              <button
                disabled={this.props.currentBet <= MIN_BET}
                onClick={this.onDecrement}
              >
                <FontAwesome name="minus" />
              </button>
              <button onClick={this.onIncrement}>
                <FontAwesome name="plus" />
              </button>
            </div>
            Current bet: ${this.props.currentBet}
          </Col>
        </Row>
      </Container>
    );
  }
}

Badge.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  score: PropTypes.number,
  balance: PropTypes.number,
  currentBet: PropTypes.number,
  dealer: PropTypes.bool.isRequired,
  flipped: PropTypes.bool.isRequired,
  setBet: PropTypes.func
};
