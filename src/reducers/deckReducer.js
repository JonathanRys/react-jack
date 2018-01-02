import { buildDeck, shuffle, cloneDeck } from "./deckHelpers";

const initialState = {
  drawnCard: null,
  deck: []
};

export default function bankReducer(state = initialState, action) {
  switch (action.type) {
    case "NEW_DECK":
      return {
        ...state,
        deck: buildDeck()
      };
    case "CLONE_DECK":
      return {
        ...state,
        deck: cloneDeck(state.deck, action.payload.numDecks)
      };
    case "SHUFFLE":
      return {
        ...state,
        deck: shuffle(state.deck)
      };
    case "DRAW_ONE":
      return {
        drawnCard: state.deck[0],
        deck: state.deck.slice(1)
      };
    case "CLEAR_CARD":
      return {
        ...state,
        drawnCard: null
      };
    default:
      return state;
  }
}
