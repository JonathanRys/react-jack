import "../../setupTests";

import playerReducer from "../playerReducer";
import {
  setName,
  setAvatar,
  takeCard,
  clearHands,
  stand,
  buyChips,
  setBet,
  loseBet,
  winBet,
  reset,
  setInsured,
  credit,
  debit
} from "../../actions/playerActions.js";
import { createStore } from "redux";

describe("Test playerReducer reducer", () => {
  it("sets new player name", () => {
    const store = createStore(playerReducer);
    store.dispatch(setName({ name: "Lester" }));
    expect(store.getState().name).toEqual("Lester");
  });

  it("sets a new avatar", () => {
    const store = createStore(playerReducer);
    store.dispatch(setAvatar({ avatar: "./images/test.png" }));
    expect(store.getState().avatar).toEqual("./images/test.png");
  });

  it("takes a new card and calculates the new score", () => {
    const store = createStore(playerReducer);
    store.dispatch(takeCard({ card: "SA" }));
    expect(store.getState().hands[store.getState().handIndex]).toEqual(["SA"]);
    expect(store.getState().score[store.getState().handIndex]).toEqual(11);
  });

  it("takes multiple cards and calculates the new score correctly with aces", () => {
    const store = createStore(playerReducer);
    store.dispatch(takeCard({ card: "SA" }));
    store.dispatch(takeCard({ card: "CA" }));
    expect(store.getState().hands[store.getState().handIndex]).toEqual([
      "SA",
      "CA"
    ]);
    expect(store.getState().score[store.getState().handIndex]).toEqual(12);
  });

  it("takes multiple cards and calculates the new score correctly with blackjack", () => {
    const store = createStore(playerReducer);
    store.dispatch(takeCard({ card: "SA" }));
    store.dispatch(takeCard({ card: "CQ" }));
    expect(store.getState().hands[store.getState().handIndex]).toEqual([
      "SA",
      "CQ"
    ]);
    expect(store.getState().score[store.getState().handIndex]).toEqual(21);
    expect(store.getState().hasBlackjack[store.getState().handIndex]).toEqual(
      true
    );
  });

  it("sets playerStands correctly", () => {
    const store = createStore(playerReducer);
    store.dispatch(stand());
    expect(store.getState().playerStands[store.getState().handIndex]).toEqual(
      true
    );
    store.dispatch(clearHands());
    expect(store.getState().playerStands[store.getState().handIndex]).toEqual(
      false
    );
  });

  it("credit given amount to player's balance", () => {
    const store = createStore(playerReducer);
    store.dispatch(buyChips({ newChips: 500 }));
    expect(store.getState().balance).toEqual(1000);
  });

  it("set the current bet", () => {
    const store = createStore(playerReducer);
    store.dispatch(setBet({ newBet: 5 }));
    expect(store.getState().currentBet).toEqual(5);
  });

  it("deducts given amount from player's balance", () => {
    const store = createStore(playerReducer);
    store.dispatch(setBet({ newBet: 5 }));
    store.dispatch(loseBet());
    expect(store.getState().balance).toEqual(495);
  });

  it("adds the current bet times a multiplier to the player's balance", () => {
    const store = createStore(playerReducer);
    store.dispatch(setBet({ newBet: 5 }));
    // test WIN_BET
    store.dispatch(winBet());
    expect(store.getState().balance).toEqual(505);
    // Test WIN_BET with a multiplier
    store.dispatch(winBet({ multiplier: 1.5 }));
    expect(store.getState().balance).toEqual(512.5);
    // Test RESET
    store.dispatch(clearHands());
    expect(store.getState()).toEqual({
      name: "Player1",
      avatar: "./images/default.png",
      playerIndex: 1,
      handIndex: 0,

      balance: 512.5,
      currentBet: 5,

      hands: [[]],
      score: [0],
      busted: [false],
      hasBlackjack: [false],
      hasInsurance: [false],
      splitHand: false,
      playerStands: [false]
    });
  });

  it("is able to purchase insurance", () => {
    const store = createStore(playerReducer);
    store.dispatch(setInsured());
    expect(store.getState().hasInsurance[store.getState().handIndex]).toEqual(
      true
    );
  });

  it("credits the account", () => {
    const store = createStore(playerReducer);
    store.dispatch(credit({ delta: 50 }));
    expect(store.getState().balance).toEqual(550);
  });

  it("debits the account", () => {
    const store = createStore(playerReducer);
    store.dispatch(credit({ delta: 50 }));
    store.dispatch(debit({ delta: 25 }));
    expect(store.getState().balance).toEqual(525);
  });
});
