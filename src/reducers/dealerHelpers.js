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
            if (card.slice(1) === "A") numberOfAces++;
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
    const newScore = scoreHand(state.hand)

    // Return a new object with the updated score
    return {
        score: newScore,
        busted: newScore > 21,
        hasBlackjack: newScore === 21 && state.hand.length === 2
    }
};

export function dealeraddCard(hand, card) {
    return { hand: [...hand, card] }
}
