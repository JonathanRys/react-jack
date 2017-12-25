import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Card from '../Card/Card'

import { connect } from 'react-redux'

const mapStateToProps = function (state) {
    console.log(state)
    return {
        cards: state.player.cards[state.player.playerIndex]
    }
}

export class Hand extends Component {
    render() {
        return (
            <div>
                {
                    this.props.cards.map((card, key) => {
                        return <Card key={`card-face-${key}`} card={card} faceUp={this.props.faceUp} />
                    })
                }
            </div>
        )
    }
}

Hand.propTypes = {
    cards: PropTypes.array.isRequired,
    faceUp: PropTypes.bool.isRequired,
}

export default connect(mapStateToProps)(Hand)
