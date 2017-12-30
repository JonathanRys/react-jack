import React from 'react'
import PropTypes from 'prop-types'

import Card from './Card/Card'

export default function Hand({ hand, dealer, handFlipped }) {
    return (
        <div style={{ margin: "auto", display: "inline-block" }}>
            {hand.map((card, key) => <Card key={`card-face-${key}`} card={card} faceUp={!(dealer && key) || handFlipped} />)}
        </div>
    )
}

Hand.propTypes = {
    hand: PropTypes.array.isRequired,
    dealer: PropTypes.bool.isRequired,
    handFlipped: PropTypes.bool,
}
