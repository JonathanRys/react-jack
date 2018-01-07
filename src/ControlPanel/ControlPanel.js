import React, { Component } from "react";
import PropTypes from "prop-types";

import _ from "lodash";

import "./control_panel.css";

import { Button, Form } from "reactstrap";
import FontAwesome from "react-fontawesome";

import gameEngine from "./gameEngine";

export default class ControlPanel extends Component {
  shouldComponentUpdate(nextProps) {
    if (_.isEqual(this.props, nextProps)) return false;
    return true;
  }

  componentWillUpdate(nextProps) {
    const result = gameEngine(nextProps);
    if (nextProps.turn.isPlaying) nextProps.setStatus(result);
  }

  render() {
    const canSplit =
      !this.props.turn.isPlaying &&
      this.props.player.hands[0] &&
      this.props.player.hands[0].length === 2 &&
      this.props.player.hands[0][0].slice(1) ===
        this.props.player.hands[0][1].slice(1);

    const canDouble =
      this.props.turn.isPlaying && this.props.player.hands[0].length === 2;

    const canBuyInsurance =
      this.props.turn.isPlaying &&
      this.props.dealer.hand[0] &&
      this.props.dealer.hand[0].slice(1) === "A" &&
      !this.props.player.hasInsurance[this.props.player.handIndex];

    // Would it be more readable to use Array.map here?
    return (
      <Form xs="4" sm="6" md="8" lg="12" className="ControlPanel_main">
        <Button
          size="md"
          color="secondary"
          block
          disabled={!this.props.turn.isPlaying}
          onClick={this.props.hitOnClick}
        >
          <FontAwesome name="hand-o-down" /> Hit
        </Button>
        <Button
          size="md"
          color="secondary"
          block
          disabled={!this.props.turn.isPlaying}
          onClick={this.props.standOnClick}
        >
          <FontAwesome name="hand-paper-o" /> Stand
        </Button>
        <Button
          size="md"
          color="secondary"
          block
          disabled={!canSplit}
          onClick={this.props.splitOnClick}
        >
          <FontAwesome name="hand-scissors-o" /> Split
        </Button>
        <Button
          size="md"
          color="secondary"
          block
          disabled={!canDouble}
          onClick={this.props.doubleDownOnClick}
        >
          <FontAwesome name="align-justify " /> Double Down
        </Button>
        <Button
          size="md"
          color="secondary"
          block
          disabled={!canBuyInsurance}
          onClick={this.props.buyInsuranceOnClick}
        >
          <FontAwesome name="dollar" /> Buy Insurance
        </Button>
        <Button
          size="md"
          color="primary"
          block
          disabled={
            this.props.turn.isPlaying &&
            this.props.player.balance - this.props.player.currentBet > 0
          }
          onClick={this.props.dealOnClick}
        >
          <FontAwesome name="handshake-o" /> Deal
        </Button>
      </Form>
    );
  }
}

// Write deeper prop type checks here
ControlPanel.propTypes = {
  player: PropTypes.shape({
    hands: PropTypes.array,
    hasInsurance: PropTypes.array,
    handIndex: PropTypes.number,
    playerStands: PropTypes.array,
    busted: PropTypes.array,
    currentBet: PropTypes.number,
    hasBlackjack: PropTypes.array
  }),
  dealer: PropTypes.shape({
    hand: PropTypes.array
  }),
  turn: PropTypes.shape({
    playersTurn: PropTypes.number,
    isPlaying: PropTypes.bool
  }),

  hitOnClick: PropTypes.func.isRequired,
  standOnClick: PropTypes.func.isRequired,
  winBet: PropTypes.func.isRequired,
  loseBet: PropTypes.func.isRequired,
  splitOnClick: PropTypes.func.isRequired,
  doubleDownOnClick: PropTypes.func.isRequired,
  buyInsuranceOnClick: PropTypes.func.isRequired,
  dealOnClick: PropTypes.func.isRequired
};
