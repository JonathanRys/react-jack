import _ from 'lodash'

const initialState = {
    name: "Player1",
    avatar: "./images/default.png",
    playerIndex: 0,

    balance: 0,
    currentBet: 0,

    handIndex: 0,
    cards: [[]],
    score: [[0]],
    busted: [[false]],
    hasBlackjack: [[false]],
    hasInsurance: [[false]],
    splitHand: false,
}

const INSURANCE_RATE = 0.5

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
    const index = state.handIndex
    const score = scoreHand(state.cards[index])

    // Return a new object with the updated score
    return {
        score: [
            ...state.score.slice(0, index),
            [score],
            ...state.score.slice(index + 1)
        ],
        busted: [
            ...state.busted.slice(0, index),
            [score > 21],
            ...state.busted.slice(index + 1)
        ],
        hasBlackjack: [
            ...state.hasBlackjack.slice(0, index),
            [score === 21 && state.cards[index].length === 2],
            ...state.hasBlackjack.slice(index + 1)
        ]
    }
};

export default function playerReducer(state = initialState, action) {
    const index = state.handIndex
    switch (action.type) {
        case "SET_NAME":
            return { ...state, name: action.payload.name }
        case "SET_AVATAR":
            return { ...state, avatar: action.payload.avatar }
        case "TAKE_CARD":
            const newHand = [...state.cards[index], action.payload.card]
            const newCards = {
                cards: [
                    ...state.cards.slice(0, index),
                    newHand,
                    ...state.cards.slice(index + 1)
                ]
            }
            return {
                ...state, ...getScore({
                    ...state, ...newCards
                }), ...newCards
            }
        case "BUY_CHIPS":
            return { ...state, balance: state.balance + action.payload.newChips }
        case "SET_BET":
            return { ...state, currentBet: action.payload.newBet }
        case "LOSE_BET":
            return { ...state, balance: state.balance - state.currentBet }
        case "WIN_BET":
            const multiplier = action.payload ? action.payload.multiplier : 1
            return { ...state, balance: state.balance + state.currentBet * multiplier }
        case "BUY_INSURANCE":
            return {
                ...state,
                balance: state.balance - (state.currentBet * INSURANCE_RATE),
                hasInsurance: [
                    ...state.hasInsurance.slice(0, index),
                    [true],
                    ...state.hasInsurance.slice(index + 1)
                ]
            }
        case "RESET":
        default:
            return initialState
    }
}