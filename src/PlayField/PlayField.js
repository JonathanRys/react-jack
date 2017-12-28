import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Dealer from './Dealer/Dealer'
import Deck from './Deck/Deck'
import Player from './Player/Player'

import { connect } from 'react-redux'

const mapStateToProps = (state) => {
    return {
        hands: state.player.hands
    }
}

export class PlayField extends Component {
    render() {
        return (
            <div>
                <Dealer />
                <Deck />
                {this.props.hands.map((hand, index) => <Player key={`hand-${index}`} hand={hand} faceUp={index} />)}
            </div>
        )
    }
}

PlayField.propTypes = {
    hands: PropTypes.array.isRequired
}

export default connect(mapStateToProps)(PlayField)
