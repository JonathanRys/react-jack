import React, { Component } from "react";
import PropTypes from "prop-types";

import "./badge.css";

import FontAwesome from "react-fontawesome";
import { Container, Row, Col } from "reactstrap";

const MIN_BET = 5;

export default class Badge extends Component {
  onIncrement = () => {
    this.props.setBet(this.props.player.currentBet + 1);
  };

  onDecrement = () => {
    this.props.setBet(this.props.player.currentBet - 1);
  };

  render() {
    return (
      <Container className="PlayField_Badge_main">
        <Row>
          <Col xs="6" lg="4">
            <img
              className="PlayField_Badge_avatar"
              alt="avatar"
              src={this.props.player.avatar}
            />
            <div className="PlayField_Badge_name">{this.props.player.name}</div>
          </Col>
          <Col xs="6" lg={{ size: 4, offset: 4 }}>
            Score:{" "}
            {this.props.dealer && !this.props.flipped
              ? null
              : this.props.player.score}
          </Col>
        </Row>
        <Row
          style={this.props.dealer ? { display: "none" } : { display: "flex" }}
        >
          <Col xs="6" lg="4">
            Balance: ${this.props.player.balance
              ? this.props.player.balance.toFixed(2)
              : 0}
          </Col>
          <Col
            xs="6"
            lg={{ size: 4, offset: 4 }}
            className="PlayField_Badge_betting-main"
          >
            <div
              className="PlayField_Badge_bet-controls"
              style={this.props.isPlaying ? { visibility: "hidden" } : {}}
            >
              <button
                disabled={this.props.player.currentBet <= MIN_BET}
                onClick={this.onDecrement}
              >
                <FontAwesome name="minus" />
              </button>
              <button onClick={this.onIncrement}>
                <FontAwesome name="plus" />
              </button>
            </div>
            Current bet: ${this.props.player.currentBet}
          </Col>
        </Row>
      </Container>
    );
  }
}

Badge.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    score: PropTypes.number,
    balance: PropTypes.number,
    currentBet: PropTypes.number,
    isPlaying: PropTypes.bool
  }),
  dealer: PropTypes.bool.isRequired,
  flipped: PropTypes.bool.isRequired,
  setBet: PropTypes.func,
  buyChips: PropTypes.func
};
