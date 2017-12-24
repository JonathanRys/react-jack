const initialState = {
    name: "Player1",
    avatar: "./images/default.png",
    playerIndex: 0,

    balance: 0,
    currentBet: 0,

    handIndex: 0,
    cards: [],
    score: [0],
    busted: [false],
    hasBlackjack: [false],
    hasInsurance: [false],
    splitHand: false,
}

const getScore = function (state) {
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
    const score = scoreHand(state.cards[state.handIndex])

    // Return a new object with the updated score
    return {
        score: [
            ...state.score.slice(0, state.handIndex),
            score,
            ...state.score.slice(state.handIndex + 1)
        ],
        busted: [
            ...state.busted.slice(0, state.handIndex),
            score > 21,
            ...state.busted.slice(state.handIndex + 1)
        ],
        hasBlackjack: [
            ...state.hasBlackjack.slice(0, state.handIndex),
            score === 21 && state.cards.length === 2,
            ...state.hasBlackjack.slice(state.handIndex + 1)
        ],
    }
};

export default function playerReducer(state = initialState, action) {
    switch (action.type) {
        case "SET_NAME":
            return { ...state, name: action.payload.name }
        case "SET_AVATAR":
            return { ...state, avatar: action.payload.avatar }
        case "TAKE_CARD":
            const index = state.handIndex
            console.log("index:", index)
            const newHand = [...state.cards, action.payload.card]
            const newCards = {
                cards: [...state.cards.slice(0, index),
                    newHand,
                ...state.cards.slice(index + 1)]
            }
            console.log("newHand:", newHand)
            console.log("newCards:", newCards)
            return {
                ...state, ...getScore({
                    ...state, ...newCards
                })
            }
        case "BUY_CHIPS":
            return { ...state, balance: state.balance + action.payload.newChips }
        case "SET_BET":
            return { ...state, currentBet: action.payload.newBet }
        case "DEDUCT_BET":
            return { ...state, balance: state.balance - state.currentBet }
        case "COLLECT_CHIPS":
            return { ...state, balance: state.balance + state.currentBet * action.payload.multiplier || 1 }
        default:
            return initialState
    }
}