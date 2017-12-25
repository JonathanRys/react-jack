import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Hand from './Hand/Hand'

import { connect } from 'react-redux'

const mapStateToProps = function (state) {
    return {
        hands: state.player.hands
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
                {this.props.hands.map((hand, index) => <Hand key={`hand-${index}`} hand={hand} faceUp={index} />)}
            </div>
        )
    }
}

PlayField.propTypes = {
    hands: PropTypes.array.isRequired
}

export default connect(mapStateToProps)(PlayField)
