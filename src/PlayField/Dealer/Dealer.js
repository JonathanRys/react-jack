import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Hand from '../Hand/Hand'

import { connect } from 'react-redux'

const mapStateToProps = (state) => {
    return {
        hand: state.dealer.hand
    }
}

export class Dealer extends Component {
    render() {
        return (
            <Hand hand={this.props.hand} dealer={true} />
        )
    }
}

Dealer.propTypes = {
    hands: PropTypes.array.isRequired
}

export default connect(mapStateToProps)(Dealer)
