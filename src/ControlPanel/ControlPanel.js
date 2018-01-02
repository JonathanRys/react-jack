import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './control_panel.css'

import { Button, Form } from 'reactstrap'
import FontAwesome from 'react-fontawesome'

function solveForBlackjack(hasBlackjack, dealerHasBlackjack, hasInsurance, winBet, loseBet) {
    console.log("args:", hasBlackjack, dealerHasBlackjack, hasInsurance, winBet, loseBet)
    // Curry this
    if (hasBlackjack) {
        if (dealerHasBlackjack) {
            if (hasInsurance) {
                loseBet()
            }
        } else {
            winBet(1.5)
        }
    } else {
        // Credit Player
        winBet()
    }
}

export default class ControlPanel extends Component {
    componentWillReceiveProps(nextProps) {
        // Game Logic
        console.log("nextProps", nextProps)
        const index = nextProps.player.handIndex
        const dealersTurn = (
            nextProps.player.playerStands[index] ||
            nextProps.player.busted[index] ||
            nextProps.player.hasBlackjack[index]
        )

        if (nextProps.turn.isPlaying && (nextProps.dealer.hand.length < 1 || nextProps.player.hands[0].length < 2)) {
            nextProps.keepDealing()
        } else if (nextProps.turn.playersTurn) {
            // It's the player's turn, but check if that should change
            if (dealersTurn) {
                nextProps.nextPlayer()
            }
        } else {
            if (dealersTurn && nextProps.turn.isPlaying) {
                //Take dealer's turn
                console.log("Looks like it's the dealer's turn:")
                nextProps.nextPlayer()

                // It's still the dealer's turn - hit until 17
                if (nextProps.dealer.score < 17) {
                    // Don't bother drawing if the player is busted
                    if (nextProps.player.busted[index]) {
                        nextProps.loseBet()
                        return
                    }
                    nextProps.drawOne()
                    return
                } else {
                    console.log("Draw loop over, comparing scores:", nextProps.dealer.score, nextProps.player.score[index])
                    // Compare scores and debit/credit player
                    if (nextProps.player.busted[index]) {
                        nextProps.loseBet()
                        return
                        // If it looks like the player won
                    } else if (nextProps.dealer.busted || nextProps.player.score[index] < nextProps.dealer.score) {
                        //Check for blackjack
                        solveForBlackjack(
                            nextProps.player.hasBlackjack[index],
                            nextProps.dealer.hasBlackjack,
                            nextProps.player.hasInsurance[index],
                            nextProps.winBet,
                            nextProps.loseBet,
                        )
                        return
                    } else {
                        // We know the player isn't busted, the dealer isn't busted, and that the player has a lower scoring hand
                        nextProps.loseBet()
                        return
                    }
                }
                // reset player
            }
            // If returning above, unwrap this
            else {
                // The turn has ended, awaiting user input
                // nextProps.nextPlayer()
            }
        }
    }

    render() {
        const canSplit = (!this.props.turn.isPlaying &&
            this.props.player.hands[0] &&
            this.props.player.hands[0].length === 2 &&
            this.props.player.hands[0][0].slice(1) === this.props.player.hands[0][1].slice(1))

        const canDouble = (this.props.turn.isPlaying && (this.props.player.hands[0].length === 2))

        const canBuyInsurance = (this.props.turn.isPlaying &&
            this.props.dealer.hand[0] &&
            this.props.dealer.hand[0].slice(1) === "A" &&
            !this.props.player.hasInsurance[this.props.player.handIndex])

        return (
            <Form xs="4" sm="6" md="8" lg="12" className="ControlPanel_main">
                <Button size="md" color="secondary" block disabled={!this.props.turn.isPlaying} onClick={this.props.hitOnClick}><FontAwesome name="hand-o-down" /> Hit</Button>
                <Button size="md" color="secondary" block disabled={!this.props.turn.isPlaying} onClick={this.props.standOnClick}><FontAwesome name="hand-paper-o" /> Stand</Button>
                <Button size="md" color="secondary" block disabled={!canSplit} onClick={this.props.splitOnClick}><FontAwesome name="hand-scissors-o" /> Split</Button>
                <Button size="md" color="secondary" block disabled={!canDouble} onClick={this.props.doubleDownOnClick}><FontAwesome name="align-justify " /> Double Down</Button>
                <Button size="md" color="secondary" block disabled={!canBuyInsurance} onClick={this.props.buyInsuranceOnClick}><FontAwesome name="dollar" /> Buy Insurance</Button>
                <Button size="md" color="primary" block disabled={this.props.turn.isPlaying} onClick={this.props.dealOnClick}><FontAwesome name="handshake-o" /> Deal</Button>
            </Form>
        )
    }
}
// Write deep prop type checks here
ControlPanel.propTypes = {
    player: PropTypes.shape({
        hands: PropTypes.array,
        hasInsurance: PropTypes.array,
        handIndex: PropTypes.number,
        playerStands: PropTypes.array,
        busted: PropTypes.array,
        hasBlackjack: PropTypes.array,

    }),
    dealer: PropTypes.shape({
        hand: PropTypes.array,
    }),
    turn: PropTypes.shape({
        playersTurn: PropTypes.number,
        isPlaying: PropTypes.bool,
    }),

    hitOnClick: PropTypes.func.isRequired,
    standOnClick: PropTypes.func.isRequired,
    winBet: PropTypes.func.isRequired,
    loseBet: PropTypes.func.isRequired,
    splitOnClick: PropTypes.func.isRequired,
    doubleDownOnClick: PropTypes.func.isRequired,
    buyInsuranceOnClick: PropTypes.func.isRequired,
    dealOnClick: PropTypes.func.isRequired,
}
