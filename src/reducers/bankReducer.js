const initialState = {
    balance: 0
}

export default function bankReducer(state = initialState, action) {
    switch (action.type) {
        case "CREDIT":
            return { balance: state.balance + action.payload.delta }
        case "DEBIT":
            return { balance: state.balance - action.payload.delta }
        default:
            return initialState
    }
}