/* Turn-based Actions */
export function play(payload) {
    return { type: "PLAY", payload: payload }
}

export function draw(payload) {
    return { type: "DRAW", payload: payload }
}

export function hit(payload) {
    return { type: "HIT", payload: payload }
}

export function stand(payload) {
    return { type: "STAND", payload: payload }
}

export function call(payload) {
    return { type: "CALL", payload: payload }
}

export function raise(payload) {
    return { type: "RAISE", payload: payload }
}

export function fold(payload) {
    return { type: "FOLD", payload: payload }
}

export function split(payload) {
    return { type: "SPLIT", payload: payload }
}

export function doubleDown(payload) {
    return { type: "DOUBLE_DOWN", payload: payload }
}

/* Bank Actions */
export function credit(payload) {
    return { type: "CREDIT", payload: payload }
}

export function debit(payload) {
    return { type: "DEBIT", payload: payload }
}


/* Deck Actions */
export function newDeck() {
    return { type: "NEW_DECK" }
}

export function cloneDeck(payload) {
    return { type: "CLONE_DECK", payload: payload }
}

export function shuffle() {
    return { type: "SHUFFLE" }
}

export function drawOne() {
    return { type: "DRAW_ONE" }
}


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

export function buyInsurance() {
    return { type: "BUY_INSURANCE" }
}

export function reset() {
    return { type: "RESET" }
}
