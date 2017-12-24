import React, { Component } from 'react'

import Hand from './Hand/Hand'

class DealerHand extends Component {
    render() {
        return (
            <Hand />
        )
    }
}

export default class PlayField extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return (
            <div>
                {/* <DealerHand /> */}
                PlayField should consist of two hands, dealer and player
                {/* <PlayerHand /> */}
            </div>
        )
    }
}