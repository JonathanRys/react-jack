import getScore from './playerHelpers'

const initialState = {
    name: "Player1",
    avatar: "./images/default.png",
    playerIndex: 1,
    handIndex: 0,

    balance: 0,
    currentBet: 0,

    hands: [[]],
    score: [[0]],
    busted: [[false]],
    hasBlackjack: [[false]],
    hasInsurance: [[false]],
    splitHand: false,
}

const INSURANCE_RATE = 0.5

export default function playerReducer(state = initialState, action) {
    const index = state.handIndex
    switch (action.type) {
        case "SET_NAME":
            return { ...state, name: action.payload.name }
        case "SET_AVATAR":
            return { ...state, avatar: action.payload.avatar }
        case "TAKE_CARD":
            const newHand = [...state.hands[index], action.payload.card]
            const newCards = {
                hands: [
                    ...state.hands.slice(0, index),
                    newHand,
                    ...state.hands.slice(index + 1)
                ]
            }
            return {
                ...state,
                ...getScore({
                    ...state, ...newCards
                }),
                ...newCards
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
        case "SET_INSURED":
            return {
                ...state,
                balance: state.balance - (state.currentBet * INSURANCE_RATE),
                hasInsurance: [
                    ...state.hasInsurance.slice(0, index),
                    [true],
                    ...state.hasInsurance.slice(index + 1)
                ]
            }
        case "CREDIT":
            return { ...state, balance: state.balance + action.payload.delta }
        case "DEBIT":
            return { ...state, balance: state.balance - action.payload.delta }
        case "RESET":
            return initialState
        default:
            return state
    }
}
