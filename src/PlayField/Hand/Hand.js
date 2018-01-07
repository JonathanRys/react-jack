import React from "react";
import PropTypes from "prop-types";

import "./hand.css";

import Card from "./Card/Card";

export default function Hand({ hand, dealer, status, handFlipped }) {
  return (
    <div
      className="PlayField_Hand"
      style={{ margin: "auto", display: "inline-block" }}
    >
      <div className="Playfield_Hand_status">
        <div className="Playfield_Hand_statusText">
          {!dealer || handFlipped ? status : ""}
        </div>
      </div>
      {hand.map((card, key) => (
        <Card
          key={`card-face-${key}`}
          card={card}
          faceUp={!(dealer && key) || handFlipped}
        />
      ))}
    </div>
  );
}

Hand.propTypes = {
  hand: PropTypes.array.isRequired,
  dealer: PropTypes.bool.isRequired,
  handFlipped: PropTypes.bool
};
