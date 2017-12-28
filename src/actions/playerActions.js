/* Player Actions */
export function setName(payload) {
    return { type: "SET_NAME", payload: payload }
}

export function setAvatar(payload) {
    return { type: "SET_AVATAR", payload: payload }
}

export function takeCard(payload) {
    return { type: "TAKE_CARD", payload: payload }
}

export function buyChips(payload) {
    return { type: "BUY_CHIPS", payload: payload }
}

export function loseBet() {
    return { type: "LOSE_BET" }
}

export function setBet(payload) {
    return { type: "SET_BET", payload: payload }
}

export function winBet(payload) {
    return { type: "WIN_BET", payload: payload }
}

export function setInsured() {
    return { type: "SET_INSURED" }
}

export function reset() {
    return { type: "RESET" }
}

export function credit(payload) {
    return { type: "CREDIT", payload: payload }
}

export function debit(payload) {
    return { type: "DEBIT", payload: payload }
}