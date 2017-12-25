import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Card from '../Card/Card'

export default class Hand extends Component {
    shouldComponentUpdate(nextProps) {
        if (this.props.faceUp === nextProps.faceUp &&
            this.props.hand === nextProps.hand) return false;
        return true;
    }

    render() {
        return (
            <div>
                {
                    this.props.hand.map((card, key) => {
                        return <Card key={`card-face-${key}`} card={card} faceUp={this.props.faceUp + key} />
                    })
                }
            </div>
        )
    }
}

Hand.propTypes = {
    faceUp: PropTypes.number.isRequired,
    hand: PropTypes.array.isRequired,
}
