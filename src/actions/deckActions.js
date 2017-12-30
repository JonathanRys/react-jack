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

export function clearCard() {
    return { type: "CLEAR_CARD" }
}
