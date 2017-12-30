import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './control_panel.css'

import { Button, Form, Label } from 'reactstrap'

export default class ControlPanel extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dealHandler: () => {
                props.dealOnClick()
                if (props.dealer.hand.length < 2 || props.player.hands[0].length < 2) {
                    console.log("Give them cards:")
                    props.keepDealing()
                }
            }
        }
        console.log("props in the CP", props)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.dealer.hand.length < 1 || nextProps.player.hands[0].length < 2) {
            console.log("They still need cards:", nextProps.dealer.hand.length, nextProps.player.hands[0].length)
            nextProps.keepDealing()
        }
    }

    render() {
        const canSplit = this.props.player.hands[0] && this.props.player.hands[0].length === 2 && this.props.player.hands[0][0].slice(1) === this.props.player.hands[0][1].slice(1)
        const canBuyInsurance = () => {
            if (!this.props.turn.isPlaying) return false
            if (!this.props.dealer.hand[0]) return false
            if (this.props.dealer.hand[0].slice(1) !== "A") return false
            if (this.props.player.hasInsurance[this.props.player.handIndex]) return false
        }
        return (
            <Form xs="10" sm="8" md="6" lg="3" className="ControlPanel_main">
                <Label className="ControlPanel_main_panel-header">Control Panel</Label>
                <Button size="md" color="secondary" block disabled={!this.props.turn.isPlaying} onClick={this.props.hitOnClick}>Hit</Button>
                <Button size="md" color="secondary" block disabled={!this.props.turn.isPlaying} onClick={this.props.standOnClick}>Stand</Button>
                <Button size="md" color="secondary" block disabled={!canSplit} onClick={this.props.splitOnClick}>Split</Button>
                <Button size="md" color="secondary" block disabled={this.props.player.hands[0].length !== 2} onClick={this.props.doubleDownOnClick}>Double Down</Button>
                <Button size="md" color="secondary" block disabled={!canBuyInsurance()} onClick={this.props.buyInsuranceOnClick}>Buy Insurance</Button>
                <Button size="md" color="primary" block disabled={this.props.turn.isPlaying} onClick={this.state.dealHandler}>Deal</Button>
            </Form>
        )
    }
}
// Write deep prop type checks here
ControlPanel.propTypes = {
    drawnCard: PropTypes.string,
    isPlaying: PropTypes.bool,

}
