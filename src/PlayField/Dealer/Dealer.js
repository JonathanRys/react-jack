import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Hand from '../Hand/Hand'

export default class Dealer extends Component {
    componentWillReceiveProps(nextProps) {
        if (!nextProps.playersTurn && nextProps.drawnCard) {
            nextProps.takeCard({ card: nextProps.drawnCard })
            nextProps.clearCard()
        }
    }

    render() {
        return (
            <Hand hand={this.props.hand} dealer={true} handFlipped={false} />
        )
    }
}

Dealer.propTypes = {
    hand: PropTypes.array.isRequired
}
