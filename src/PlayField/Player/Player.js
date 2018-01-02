import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Hand from '../Hand/Hand'

export default class Player extends Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.drawnCard) {
            nextProps.takeCard({ card: nextProps.drawnCard })
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
    takeCard: PropTypes.func.isRequired,
}
