import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Container, Row, Col } from 'reactstrap';

import Dealer from './Dealer/Dealer'
import Deck from './Deck/Deck'
import Player from './Player/Player'

export default class PlayField extends Component {
    render() {
        console.log("PlayField props:", this.props)
        return (
            <Container className="PlayField_main">
                <Row>
                    <Dealer
                        playersTurn={this.props.turn.playersTurn}
                        hand={this.props.dealer.hand}
                        drawnCard={this.props.turn.playersTurn ? null : this.props.deck.drawnCard}
                        takeCard={this.props.giveDealerCard}
                        clearCard={this.props.clearCard}
                    />
                </Row>
                <Row>
                    <Deck /> {/* Really just an image I guess.  Maybe add some animation... */}
                </Row>
                <Row>
                    <Player
                        playersTurn={this.props.turn.playersTurn}
                        hands={this.props.player.hands}
                        drawnCard={this.props.turn.playersTurn ? this.props.deck.drawnCard : null}
                        takeCard={this.props.giveCard}
                        clearCard={this.props.clearCard}
                    />
                </Row>
            </Container>
        )
    }
}

PlayField.propTypes = {
    player: PropTypes.object.isRequired,
    dealer: PropTypes.object.isRequired,
    deck: PropTypes.object.isRequired,
    turn: PropTypes.object.isRequired,
}
