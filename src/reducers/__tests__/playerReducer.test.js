import "../../setupTests";

import playerReducer from "../playerReducer";

import { createStore } from "redux";

describe("Test playerReducer reducer", () => {
  it("sets new player name", () => {
    const store = createStore(playerReducer);
    store.dispatch({ type: "SET_NAME", payload: { name: "Lester" } });
    expect(store.getState().name).toEqual("Lester");
  });

  it("sets a new avatar", () => {
    const store = createStore(playerReducer);
    store.dispatch({
      type: "SET_AVATAR",
      payload: { avatar: "./images/test.png" }
    });
    expect(store.getState().avatar).toEqual("./images/test.png");
  });

  it("sets the players status", () => {
    const store = createStore(playerReducer);
    store.dispatch({ type: "SET_STATUS", payload: { status: "Blackjack" } });
    expect(store.getState().status).toEqual("Blackjack");
  });

  it("takes a new card and calculates the new score", () => {
    const store = createStore(playerReducer);
    store.dispatch({ type: "TAKE_CARD", payload: { card: "SA" } });
    expect(store.getState().hands[store.getState().handIndex]).toEqual(["SA"]);
    expect(store.getState().score[store.getState().handIndex]).toEqual(11);
  });

  it("takes multiple cards and calculates the new score correctly with aces", () => {
    const store = createStore(playerReducer);
    store.dispatch({ type: "TAKE_CARD", payload: { card: "SA" } });
    store.dispatch({ type: "TAKE_CARD", payload: { card: "CA" } });
    expect(store.getState().hands[store.getState().handIndex]).toEqual([
      "SA",
      "CA"
    ]);
    expect(store.getState().score[store.getState().handIndex]).toEqual(12);
  });

  it("takes multiple cards and calculates the new score correctly with blackjack", () => {
    const store = createStore(playerReducer);
    store.dispatch({ type: "TAKE_CARD", payload: { card: "SA" } });
    store.dispatch({ type: "TAKE_CARD", payload: { card: "CQ" } });
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
    store.dispatch({ type: "STAND" });
    expect(store.getState().playerStands[store.getState().handIndex]).toEqual(
      true
    );
    store.dispatch({ type: "CLEAR_HANDS" });
    expect(store.getState().playerStands[store.getState().handIndex]).toEqual(
      false
    );
  });

  it("credit given amount to player's balance", () => {
    const store = createStore(playerReducer);
    store.dispatch({ type: "BUY_CHIPS", payload: { newChips: 500 } });
    expect(store.getState().balance).toEqual(995);
  });

  it("set the current bet", () => {
    const store = createStore(playerReducer);
    store.dispatch({ type: "SET_BET", payload: { newBet: 5 } });
    expect(store.getState().currentBet).toEqual(5);
  });

  it("deducts given amount from player's balance", () => {
    const store = createStore(playerReducer);
    store.dispatch({ type: "SET_BET", payload: { newBet: 5 } });
    store.dispatch({ type: "LOSE_BET" });
    expect(store.getState().balance).toEqual(490);
  });

  it("adds the current bet times a multiplier to the player's balance", () => {
    const store = createStore(playerReducer);
    store.dispatch({ type: "SET_BET", payload: { newBet: 5 } });
    // test WIN_BET
    store.dispatch({ type: "WIN_BET" });
    expect(store.getState().balance).toEqual(500);
    // Test WIN_BET with a multiplier
    store.dispatch({ type: "WIN_BET", payload: { multiplier: 1.5 } });
    expect(store.getState().balance).toEqual(507.5);
    // Test RESET
    store.dispatch({ type: "CLEAR_HANDS" });
    expect(store.getState()).toEqual({
      name: "Player1",
      avatar: "./images/default.png",
      playerIndex: 1,
      handIndex: 0,

      balance: 507.5,
      currentBet: 5,

      hands: [[]],
      status: [],
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
    store.dispatch({ type: "SET_INSURED" });
    expect(store.getState().hasInsurance[store.getState().handIndex]).toEqual(
      true
    );
  });

  it("credits the account", () => {
    const store = createStore(playerReducer);
    store.dispatch({ type: "CREDIT", payload: { delta: 50 } });
    expect(store.getState().balance).toEqual(545);
  });

  it("debits the account", () => {
    const store = createStore(playerReducer);
    store.dispatch({ type: "CREDIT", payload: { delta: 50 } });
    store.dispatch({ type: "DEBIT", payload: { delta: 25 } });
    expect(store.getState().balance).toEqual(520);
  });
});
