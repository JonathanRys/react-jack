export default function getScore(state) {
    // Define scoring enum
    const points = {
        "2": 2, "3": 3, "4": 4, "5": 5,
        "6": 6, "7": 7, "8": 8, "9": 9,
        "10": 10, "J": 10, "Q": 10, "K": 10,
        "A": 11
    }

    // Declare a function to return the score
    const scoreHand = (cards) => {
        // Set initial values
        let score = 0
        let numberOfAces = 0

        // Calculate score based on points enum
        score = cards.map((card) => {
            if (card.slice(1) === "A")++numberOfAces;
            return points[card.slice(1)]
        }).reduce((a, b) => a + b)

        // Score aces as 1 if they bring the score over 21
        while (numberOfAces && score > 21) {
            score -= 10;
            --numberOfAces;
        }

        return score
    }

    // Score the current hand
    const index = state.handIndex
    const newScore = scoreHand(state.hands[index])

    // Return a new object with the updated score
    return {
        score: [
            ...state.score.slice(0, index),
            [newScore],
            ...state.score.slice(index + 1)
        ],
        busted: [
            ...state.busted.slice(0, index),
            [newScore > 21],
            ...state.busted.slice(index + 1)
        ],
        hasBlackjack: [
            ...state.hasBlackjack.slice(0, index),
            [newScore === 21 && state.hands[index].length === 2],
            ...state.hasBlackjack.slice(index + 1)
        ]
    }
};

export function addCard(hands, card, index = 0) {
    const newHand = [...hands[index], card]

    return {
        hands: [
            ...hands.slice(0, index),
            newHand,
            ...hands.slice(index + 1)
        ]
    }
}
