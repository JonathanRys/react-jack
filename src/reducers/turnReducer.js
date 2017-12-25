const initialState = {
    isPlaying: false,
    numPlayers: 1,
    playersTurn: 0,
    error: false,
    errMsg: "",
}

export default function turnReducer(state = initialState, action) {
    switch (action.type) {
        case "PLAY":
            return { isPlaying: true }
        case "ADD_PLAYER":
            return { numPlayers: state.numPlayers < 9 ? state.numPlayers + 1 : 9 }
        case "NEXT_PLAYER":
            return { playersTurn: (state.playersTurn + 1) % state.numPlayers }
        /** Move to controller */
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