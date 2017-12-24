const initialState = {

}

export default function turnReducer(state = initialState, action) {
    switch (action.type) {
        case "DRAW":
            break;
        case "HIT":
            break;
        case "STAND":
            break;
        case "CALL":
            break;
        case "RAISE":
            break;
        case "FOLD":
            break;
        case "SPLIT":
            break;
        case "DOUBLE_DOWN":
            break;
        default:
            return initialState
    }
}