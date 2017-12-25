const initialState = {
    isPlaying: false,
    playersTurn: 0
}

export default function turnReducer(state = initialState, action) {
    switch (action.type) {
        case "PLAY":
            return
        case "DRAW":
            return
        case "HIT":
            return
        case "STAND":
            return
        case "CALL":
            return
        case "RAISE":
            return
        case "FOLD":
            return
        case "SPLIT":
            return
        case "DOUBLE_DOWN":
            return
        default:
            return initialState
    }
}