import React, { Component } from 'react'
// import PropTypes from 'prop-types'

import './control_panel.css'

import { drawOne, takeCard, newDeck, shuffle, play } from '../actions/actions.js'
import { hit, stand, split, doubleDown, buyInsurance } from '../actions/actions.js'

import { dealStory } from '../stories/controllerStories'

import { Button, Form, Label } from 'reactstrap'

import { connect } from 'react-redux'

const mapStateToProps = (state) => {
    console.log("state:", state)
    return {
        drawnCard: state.deck.drawnCard,
        isPlaying: state.turn.isPlaying
    }
}

const dispatchAll = (dispatch, actions) => {
    actions.map((action) => { return dispatch(action()) })
}

const mapDispatchToProps = (dispatch) => {
    return {
        giveCard: (card) => {
            dispatch(takeCard({ card: card }))
        },
        hitOnClick: () => {
            dispatch(drawOne())
            // Draw a card from the deck
            // Pass drawn card to player
            dispatch(takeCard({ card: "SA" }))
            dispatch(hit())
        },
        standOnClick: () => { dispatch(stand()) },
        splitOnClick: () => { dispatch(split()) },
        doubleDownOnClick: () => { dispatch(doubleDown()) },
        buyInsuranceOnClick: () => { dispatch(buyInsurance()) },
        dealOnClick: () => {
            console.log("DEAL clicked")
            dispatchAll(dispatch, dealStory)
            dispatch(takeCard({ card: "SA" }))
            // take card
            // repeat

            // activate buttons
        },
    }
}

const Controls = ({ events, giveCard, drawnCard }) => {
    const dealStory = () => {
        events.dealOnClick()
        giveCard(drawnCard)
    }

    return (
        <Form xs="10" sm="8" md="6" lg="3" className="ControlPanel_main">
            <Label className="ControlPanel_main_panel-header">Control Panel</Label>
            <Button size="md" color="secondary" block disabled onClick={events.hitOnClick}>Hit</Button>
            <Button size="md" color="secondary" block disabled onClick={events.standOnClick}>Stand</Button>
            <Button size="md" color="secondary" block disabled onClick={events.splitOnClick}>Split</Button>
            <Button size="md" color="secondary" block disabled onClick={events.doubleDownOnClick}>Double Down</Button>
            <Button size="md" color="secondary" block disabled onClick={events.buyInsuranceOnClick}>Buy Insurance</Button>
            <Button size="md" color="primary" block onClick={events.dealOnClick}>Deal</Button>
        </Form>
    )
}

export class ControlPanel extends Component {
    giveCard() {
        const card = this.state.drawnCard
        console.log("card:", card)
        this.state.giveCard(card)
    }

    render() {
        console.log("this.props:", this.props)
        const props = {
            events: { ...this.props },
            giveCard: this.giveCard,
            drawnCard: this.props.drawnCard
        }
        return (
            <Controls {...props} />
        )
    }
}

// ControlPanel.propTypes = {

// }

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel)
