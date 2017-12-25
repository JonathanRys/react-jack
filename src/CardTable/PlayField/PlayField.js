import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Hand from './Hand/Hand'

import { connect } from 'react-redux'

const mapStateToProps = function (state) {
    return {
        hands: state.player.hands[state.player.playerIndex] || []
    }
}

export class PlayField extends Component {
    shouldComponentUpdate(nextProps) {
        if (this.props.hands === nextProps.hands) return false;
        return true;
    }
    render() {
        return (
            <div>
                {this.props.hands.map((hand, index) => <Hand hand={hand} faceUp={index} />)}

                {/* faceUp should be set to state.player.playerIndex */}
                {/* <Hand hands={this.props.hands} faceUp={true} /> */}
                PlayField should consist of two hands, dealer and player
            </div>
        )
    }
}

Hand.propTypes = {
    hands: PropTypes.array.isRequired
}

export default connect(mapStateToProps)(PlayField)