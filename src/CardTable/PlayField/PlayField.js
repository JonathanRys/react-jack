import React, { Component } from 'react'

import Hand from './Hand/Hand'

export default class PlayField extends Component {
    render() {
        return (
            <div>
                <Hand />
                PlayField should consist of two hands, dealer and player
                {/* <PlayerHand /> */}
            </div>
        )
    }
}