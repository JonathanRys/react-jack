import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Hand from '../Hand/Hand'

export default class Player extends Component {
    componentWillReceiveProps(nextProps) {
        console.log("Ooh, here come the player props... ", nextProps)
        if (nextProps.playersTurn && nextProps.drawnCard) {
            nextProps.takeCard({ card: nextProps.drawnCard })
            nextProps.clearCard()
        }
    }

    render() {
        return (
            this.props.hands.map((hand, index) => <Hand key={`hand-${index}`} hand={hand} dealer={false} />)
        )
    }
}

Player.propTypes = {
    hands: PropTypes.array.isRequired,
    drawnCard: PropTypes.string,
    clearCard: PropTypes.func.isRequired,
}
