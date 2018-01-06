import React from "react";
import PropTypes from "prop-types";

import Hand from "../Hand/Hand";

export default function Player({ hands }) {
  return hands.map((hand, index) => (
    <Hand key={`hand-${index}`} hand={hand} dealer={false} />
  ));
}

Player.propTypes = {
  hands: PropTypes.array.isRequired
};
