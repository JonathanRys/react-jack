import React, { Component } from 'react'
import PropTypes from 'proptypes'

import Card from '../Card/Card'

class Hand extends Component {
    render() {
        return (
            <div>
                {
                    this.props.cards.map((card, key) => {
                        return <Card key={`card-face-${key}`} {...card} />
                    })
                }
            </div>
        )
    }
}

Hand.propTypes = {
    cards: PropTypes.array.isRequired
}

export default Hand
