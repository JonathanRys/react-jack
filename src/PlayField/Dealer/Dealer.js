import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Hand from '../Hand/Hand'

export default class Dealer extends Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.drawnCard) {
            nextProps.takeCard({ card: nextProps.drawnCard })
        }
    }

    render() {
        return (
            <Hand hand={this.props.hand} dealer={true} handFlipped={false} />
        )
    }
}

Dealer.propTypes = {
    hand: PropTypes.array.isRequired,
    drawnCard: PropTypes.string,
    takeCard: PropTypes.func.isRequired,
}
