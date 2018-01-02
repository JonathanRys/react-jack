/* Turn-based Actions */
export function play() {
  return { type: "PLAY" };
}

export function dealerTurn() {
  return { type: "DEALER_TURN" };
}

export function addPlayer() {
  return { type: "ADD_PLAYER" };
}

export function nextPlayer() {
  return { type: "NEXT_PLAYER" };
}
