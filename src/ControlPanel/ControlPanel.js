import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './control_panel.css'

import { Button, Form, Label } from 'reactstrap'

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
            // It's the player's turn, check if that should change
            if (dealersTurn) {
                nextProps.nextPlayer()
            }
        } else {
            if (dealersTurn) {
                //Take dealer's turn
                console.log("Looks like the dealer's turn:")
                nextProps.dealerTurn()

                // It's still the dealer's turn - hit until 17
                if (nextProps.dealer.score < 17) {
                    if (nextProps.player.busted[index]) {
                        nextProps.loseBet()
                        nextProps.reset()
                    }
                    nextProps.drawOne()
                    return
                } else {

                    // Compare scores and debit/credit player
                    if (nextProps.player.busted[index]) {
                        nextProps.loseBet()
                        nextProps.reset()
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
                        nextProps.reset()
                        return
                    } else {
                        // We know the player isn't busted, the dealer isn't busted, and that the player has a lower scoring hand
                        nextProps.loseBet()
                        nextProps.reset()
                        return
                    }
                }
                // reset player
            }
            // If returning above, unwrap this
            else {
                nextProps.nextPlayer()
            }
        }
    }

    render() {
        const canSplit = (!this.props.turn.isPlaying &&
            this.props.player.hands[0] &&
            this.props.player.hands[0].length === 2 &&
            this.props.player.hands[0][0].slice(1) === this.props.player.hands[0][1].slice(1))

        const canBuyInsurance = () => {
            if (!this.props.turn.isPlaying) return false
            if (!this.props.dealer.hand[0]) return false
            if (this.props.dealer.hand[0].slice(1) !== "A") return false
            if (!this.props.player.hasInsurance[this.props.player.handIndex]) return false
            return true;
        }

        return (
            <Form xs="4" sm="6" md="8" lg="12" className="ControlPanel_main">
                <Label className="ControlPanel_main_panel-header">Control Panel</Label>
                <Button size="md" color="secondary" block disabled={!this.props.turn.isPlaying} onClick={this.props.hitOnClick}>Hit</Button>
                <Button size="md" color="secondary" block disabled={!this.props.turn.isPlaying} onClick={this.props.standOnClick}>Stand</Button>
                <Button size="md" color="secondary" block disabled={!canSplit} onClick={this.props.splitOnClick}>Split</Button>
                <Button size="md" color="secondary" block disabled={!this.props.turn.isPlaying && (this.props.player.hands[0].length !== 2)} onClick={this.props.doubleDownOnClick}>Double Down</Button>
                <Button size="md" color="secondary" block disabled={!canBuyInsurance()} onClick={this.props.buyInsuranceOnClick}>Buy Insurance</Button>
                <Button size="md" color="primary" block disabled={this.props.turn.isPlaying} onClick={this.props.dealOnClick}>Deal</Button>
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
    reset: PropTypes.func.isRequired,
}
