import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Hand from '../Hand/Hand'

import { connect } from 'react-redux'

const mapStateToProps = (state) => {
    return {
        hands: state.player.hands
    }
}

export class Player extends Component {
    render() {
        return (
            this.props.hands.map((hand, index) => <Hand key={`hand-${index}`} hand={hand} faceUp={true} />)
        )
    }
}

Player.propTypes = {
    hands: PropTypes.array.isRequired
}

export default connect(mapStateToProps)(Player)
