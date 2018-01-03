import getScore, { dealerAddCard } from "./dealerHelpers";

const initialState = {
  name: "Dealer",
  avatar: "./images/dealer.png",

  handFlipped: false,
  hand: [],
  score: 0,
  busted: false,
  hasBlackjack: false
};

export default function dealerReducer(state = initialState, action) {
  switch (action.type) {
    case "DEALER_TAKE_CARD":
      const newHand = dealerAddCard(state.hand, action.payload.card);
      return {
        ...state,
        ...getScore({
          ...state,
          ...newHand
        }),
        ...newHand
      };
    case "CLEAR_HANDS":
      return {
        ...initialState
      };
    default:
      return state;
  }
}
