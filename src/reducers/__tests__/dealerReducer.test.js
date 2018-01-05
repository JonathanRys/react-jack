import dealerReducer from "../dealerReducer";
import {
  dealerTakeCard,
  reset,
  flipHand,
  clearHands
} from "../../actions/playerActions.js";
import { createStore } from "redux";

describe("Test dealerReducer reducer", () => {
  it("takes a new card and calculates the new score", () => {
    const store = createStore(dealerReducer);
    store.dispatch(dealerTakeCard({ card: "SA" }));
    expect(store.getState().hand).toEqual(["SA"]);
    expect(store.getState().score).toEqual(11);
  });

  it("takes multiple cards and calculates the new score correctly with aces", () => {
    const store = createStore(dealerReducer);
    store.dispatch(dealerTakeCard({ card: "SA" }));
    store.dispatch(dealerTakeCard({ card: "CA" }));
    expect(store.getState().hand).toEqual(["SA", "CA"]);
    expect(store.getState().score).toEqual(12);
  });

  it("takes multiple cards and calculates the new score correctly with blackjack", () => {
    const store = createStore(dealerReducer);
    store.dispatch(dealerTakeCard({ card: "SA" }));
    store.dispatch(dealerTakeCard({ card: "CQ" }));
    expect(store.getState().hand).toEqual(["SA", "CQ"]);
    expect(store.getState().score).toEqual(21);
    expect(store.getState().hasBlackjack).toEqual(true);
  });

  it("clears the dealers hand", () => {
    const store = createStore(dealerReducer);
    store.dispatch(clearHands());
    expect(store.getState().hand).toEqual([]);
  });
});
