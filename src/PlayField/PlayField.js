import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Container, Row } from 'reactstrap';

import "./play-field.css"

import Dealer from './Dealer/Dealer'
import Deck from './Deck/Deck'
import Player from './Player/Player'
import Badge from './Badge/Badge'

export default class PlayField extends Component {
    render() {
        console.log("PlayField props:", this.props)
        return (
            <Container className="PlayField_main">
                <Row>
                    <Badge
                        name={this.props.dealer.name}
                        avatar={this.props.dealer.avatar}
                        score={this.props.dealer.score}
                        dealer={true}
                    />
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
                    <Badge
                        name={this.props.player.name}
                        avatar={this.props.player.avatar}
                        score={this.props.player.score[this.props.player.handIndex]}
                        balance={this.props.player.balance}
                        currentBet={this.props.player.currentBet}
                        dealer={false}
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
