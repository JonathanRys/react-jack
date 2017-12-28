import getScore from './dealerHelpers'

const initialState = {
    name: "Dealer",
    avatar: "./images/dealer.png",

    hand: [],
    score: [0],
    busted: [false],
    hasBlackjack: [false],
}

export default function playerReducer(state = initialState, action) {
    switch (action.type) {
        case "TAKE_CARD":
            const newHand = { hand: [...state.hand, action.payload.card] }
            return {
                ...state, ...getScore({
                    ...state, ...newHand
                }), ...newHand
            }

        case "RESET":
        default:
            return initialState
    }
}