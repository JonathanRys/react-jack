import "../../setupTests";

import turnReducer from "../turnReducer";
import {
  play,
  addPlayer,
  nextPlayer,
  dealerTurn
} from "../../actions/turnActions.js";
import { createStore } from "redux";

describe("Test turnReducer reducer", () => {
  it("dispatches PLAY action", () => {
    const store = createStore(turnReducer);
    store.dispatch(play());
    expect(store.getState().isPlaying).toEqual(true);
  });

  it("dispatches DEALER_TURN action", () => {
    const store = createStore(turnReducer);
    store.dispatch(dealerTurn());
    expect(store.getState().isPlaying).toEqual(false);
    expect(store.getState().playersTurn).toEqual(0);
  });

  it("dispatches ADD_PLAYER action", () => {
    const store = createStore(turnReducer);
    store.dispatch(addPlayer());
    expect(store.getState().numPlayers).toEqual(3);
    store.dispatch(addPlayer());
    store.dispatch(addPlayer()); /** 5 */
    store.dispatch(addPlayer());
    store.dispatch(addPlayer());
    store.dispatch(addPlayer());
    store.dispatch(addPlayer());
    store.dispatch(addPlayer()); /** 10 */
    expect(store.getState().numPlayers).toEqual(9);
    /** Return error message */
  });

  it("dispatches NEXT_PLAYER action", () => {
    const store = createStore(turnReducer);
    store.dispatch(nextPlayer());
    expect(store.getState().playersTurn).toEqual(1);
    store.dispatch(nextPlayer());
    expect(store.getState().playersTurn).toEqual(0);
    store.dispatch(nextPlayer());
    expect(store.getState().playersTurn).toEqual(1);
  });

  // it("dispatches HIT action", () => {
  //     const store = createStore(turnReducer)
  //     store.dispatch(hit())
  //     expect(true).toEqual(true)
  // })

  // it("dispatches STAND action", () => {
  //     const store = createStore(turnReducer)
  //     store.dispatch(stand())
  //     expect(true).toEqual(true)
  // })

  // it("dispatches SPLIT action", () => {
  //     const store = createStore(turnReducer)
  //     store.dispatch(split())
  //     expect(true).toEqual(true)
  // })

  // it("dispatches DOUBLE_DOWN action", () => {
  //     const store = createStore(turnReducer)
  //     store.dispatch(doubleDown())
  //     expect(true).toEqual(true)
  // })

  // it("dispatches BUY_INSURANCE action", () => {
  //     const store = createStore(turnReducer)
  //     store.dispatch(buyInsurance())
  //     expect(true).toEqual(true)
  // })
});
