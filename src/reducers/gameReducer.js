const initialState = {

}

export default function gameReducer(state = initialState, action) {
    switch (action.type) {
        case "INCREASE_BET":
            break;
        case "DECREASE_BET":
            break;
        case "PLAY":
            break;
        default:
            return initialState
    }
}