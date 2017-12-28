import React from 'react'
import PropTypes from 'prop-types'

import Card from './Card/Card'

// export default class Hand extends Component {
const Hand = ({ hand, dealer }) => {
    return (
        hand.map((card, key) => <Card key={`card-face-${key}`} card={card} faceUp={dealer && !key ? false : true} />)
    )
}

Hand.propTypes = {
    dealer: PropTypes.bool,
    hand: PropTypes.array.isRequired,
}

export default Hand
