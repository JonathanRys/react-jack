import React, { Component } from 'react'
import PropTypes from 'prop-types';

import "./card.css"

export default class Card extends Component {
    shouldComponentUpdate(nextProps) {
        if (this.props.faceUp === nextProps.faceUp &&
            this.props.card === nextProps.card) return false;
        return true;
    }

    render() {
        return (
            <div className={`PlayField__Card__card-face ${this.props.faceUp ? this.props.card : ""}`}></div>
        )
    }
}

Card.propTypes = {
    card: PropTypes.string.isRequired,
    faceUp: PropTypes.number.isRequired,
}