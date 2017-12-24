import React, { Component } from 'react'
import PropTypes from 'prop-types';

import "./card.css"

export default class Card extends Component {
    shouldComponentUpdate(nextProps) {
        if (this.props === nextProps) return false;
    }

    render() {
        return (
            <div className={`PlayField__Card__card-face ${this.props.faceUp ? this.props.card : ""}`}></div>
        )
    }
}

Card.propTypes = {
    card: PropTypes.string.isRequired,
    faceUp: PropTypes.bool.isRequired,
}