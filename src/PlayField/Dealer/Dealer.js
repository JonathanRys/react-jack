import React, { Component } from "react";
import PropTypes from "prop-types";

import Hand from "../Hand/Hand";

export default class Dealer extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.drawnCard) {
      nextProps.takeCard(nextProps.drawnCard);
    }
  }

  render() {
    return (
      <Hand
        hand={this.props.hand}
        dealer={true}
        handFlipped={this.props.flipped}
      />
    );
  }
}

Dealer.propTypes = {
  hand: PropTypes.array.isRequired,
  flipped: PropTypes.bool.isRequired,
  drawnCard: PropTypes.string,
  takeCard: PropTypes.func.isRequired
};
