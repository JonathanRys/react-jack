import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Dealer from './Dealer/Dealer'
import Deck from './Deck/Deck'
import Player from './Player/Player'

export default class PlayField extends Component {
    render() {
        console.log("PlayField props:", this.props)
        return (
            <div className="PlayField_main">
                <Dealer
                    playersTurn={this.props.turn.playersTurn}
                    hand={this.props.dealer.hand}
                    drawnCard={this.props.turn.playersTurn ? null : this.props.deck.drawnCard}
                    takeCard={this.props.giveDealerCard}
                    clearCard={this.props.clearCard}
                />
                <Deck /> {/* Really just an image */}
                <Player
                    playersTurn={this.props.turn.playersTurn}
                    hands={this.props.player.hands}
                    drawnCard={this.props.turn.playersTurn ? this.props.deck.drawnCard : null}
                    takeCard={this.props.giveCard}
                    clearCard={this.props.clearCard}
                />
            </div>
        )
    }
}

PlayField.propTypes = {
    player: PropTypes.object.isRequired,
    dealer: PropTypes.object.isRequired,
    deck: PropTypes.object.isRequired,
    turn: PropTypes.object.isRequired,
}
