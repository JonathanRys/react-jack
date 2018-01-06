import React from "react";
import PropTypes from "prop-types";

import Hand from "../Hand/Hand";

export default function Dealer({ hand, flipped }) {
  return <Hand hand={hand} dealer={true} handFlipped={flipped} />;
}

Dealer.propTypes = {
  hand: PropTypes.array.isRequired,
  flipped: PropTypes.bool.isRequired
};
