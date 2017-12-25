const initialState = {
    isPlaying: false,
    playersTurn: 0
}

export default function turnReducer(state = initialState, action) {
    switch (action.type) {
        case "PLAY":
            return
        case "HIT":
            return
        case "STAND":
            return
        case "SPLIT":
            return
        case "DOUBLE_DOWN":
            return
        case "BUY_INSURANCE":
            return
        default:
            return initialState
    }
}