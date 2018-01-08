import React from "react";

import App from "../App";
import { shallow } from "enzyme";

import { createStore } from "redux";
import rootReducer from "../reducers/index";

describe("Test the App component", () => {
  it("matches the snapshot", () => {
    const store = createStore(rootReducer);
    const component = shallow(<App store={store} />);
    expect(component).toMatchSnapshot();
  });

  it("changes the player's name", () => {
    const store = createStore(rootReducer);
    const component = shallow(<App store={store} />);

    component.props().setName("Tester");
    expect(store.getState().player.name).toEqual("Tester");
  });

  it("changes the player's avatar", () => {
    const store = createStore(rootReducer);
    const component = shallow(<App store={store} />);

    component.props().setAvatar("./images/test.png");
    expect(store.getState().player.avatar).toEqual("./images/test.png");
  });

  it("sets the player's status", () => {
    const store = createStore(rootReducer);
    const component = shallow(<App store={store} />);

    component.props().setStatus("Blackjack");
    expect(store.getState().player.status[0]).toEqual("Blackjack");
  });

  it("wins bet", () => {
    const store = createStore(rootReducer);
    const component = shallow(<App store={store} />);

    expect(store.getState().player.balance).toEqual(500);
    component.props().setBet(5);
    expect(store.getState().player.currentBet).toEqual(5);
    component.props().winBet();
    expect(store.getState().player.balance).toEqual(505);
    component.props().winBet(2);
    expect(store.getState().player.balance).toEqual(515);
  });

  it("deducts given amount from player's balance", () => {
    const store = createStore(rootReducer);
    const component = shallow(<App store={store} />);

    expect(store.getState().player.balance).toEqual(500);
    component.props().buyChips(500);
    expect(store.getState().player.balance).toEqual(1000);
  });

  it("starts and stops playing the game", () => {
    const store = createStore(rootReducer);
    const component = shallow(<App store={store} />);

    component.props().play();
    expect(store.getState().turn.isPlaying).toEqual(true);

    component.props().stop();
    expect(store.getState().turn.isPlaying).toEqual(false);
  });

  it("sets dealers turn", () => {
    const store = createStore(rootReducer);
    const component = shallow(<App store={store} />);

    component.props().dealerTurn();
    expect(store.getState().turn.playersTurn).toEqual(0);
  });

  it("player hits on click", () => {
    const store = createStore(rootReducer);
    const component = shallow(<App store={store} />);

    expect(store.getState().deck.drawnCard).toEqual(null);
    component.props().hitOnClick();
    expect(store.getState().deck.drawnCard).not.toEqual(null);
  });

  it("player nextHand on click", () => {
    const store = createStore(rootReducer);
    const component = shallow(<App store={store} />);

    component.props().nextHand();
    expect(store.getState().player.handIndex).toEqual(1);
    component.props().nextHand();
    expect(store.getState().player.handIndex).toEqual(0);
  });

  it("player stands on click", () => {
    const store = createStore(rootReducer);
    const component = shallow(<App store={store} />);

    component.props().standOnClick();
    expect(store.getState().player.playerStands[0]).toEqual(true);
  });

  it("cycles the player and doubles down on click", () => {
    const store = createStore(rootReducer);
    const component = shallow(<App store={store} />);

    expect(store.getState().player.doubledDown[0]).toEqual(false);
    expect(store.getState().deck.drawnCard).toEqual(null);
    expect(store.getState().turn.playersTurn).toEqual(1);
    component.props().doubleDownOnClick();
    expect(store.getState().player.doubledDown[0]).toEqual(true);
    expect(store.getState().deck.drawnCard).not.toEqual(null);
    expect(store.getState().turn.playersTurn).toEqual(1);
  });

  it("buys insurance on click", () => {
    const store = createStore(rootReducer);
    const component = shallow(<App store={store} />);

    expect(store.getState().player.hasInsurance[0]).toEqual(false);
    component.props().buyInsuranceOnClick();
    expect(store.getState().player.hasInsurance[0]).toEqual(true);
  });

  it("deals the first card on click", () => {
    const store = createStore(rootReducer);
    const component = shallow(<App store={store} />);

    // Initial expectations
    expect(store.getState().player.hands[0]).toEqual([]);
    expect(store.getState().deck.deck).toEqual([]);

    store.dispatch({ type: "TAKE_CARD", payload: { card: "H8" } });
    expect(store.getState().player.hands[0]).toEqual(["H8"]);

    store.dispatch({ type: "NEW_DECK" });
    expect(store.getState().deck.deck).not.toEqual([]);

    const unShuffledDeck = store.getState().deck.deck;

    component.props().dealOnClick();
    expect(store.getState().player.hands[0]).toEqual([]);
    expect(store.getState().deck.deck).not.toEqual([]);
    expect(store.getState().deck.deck).not.toEqual(unShuffledDeck);

    component.props().keepDealing();
    expect(store.getState().deck.drawnCard).not.toEqual("");
    expect(store.getState().turn.playersTurn).toEqual(0);
  });

  it("takes player card from draw pile", () => {
    const store = createStore(rootReducer);
    const component = shallow(<App store={store} />);

    component.props().dealOnClick();
    component.props().hitOnClick();
    component.props().nextPlayer();
    const drawnCard = store.getState().deck.drawnCard;

    component.props().giveCard(drawnCard);
    expect(store.getState().player.hands[0]).toEqual([drawnCard]);
    expect(store.getState().deck.drawnCard).toEqual(null);
  });

  it("takes dealer card from draw pile", () => {
    const store = createStore(rootReducer);
    const component = shallow(<App store={store} />);

    component.props().dealOnClick();
    component.props().hitOnClick();
    const drawnCard = store.getState().deck.drawnCard;

    component.props().giveDealerCard(drawnCard);
    expect(store.getState().dealer.hand).toEqual([drawnCard]);
    expect(store.getState().deck.drawnCard).toEqual(null);
  });

  it("clears the hands", () => {
    const store = createStore(rootReducer);
    const component = shallow(<App store={store} />);

    component.props().giveCard("D2");
    component.props().giveDealerCard("H7");

    expect(store.getState().player.hands[0]).toEqual(["D2"]);
    expect(store.getState().dealer.hand).toEqual(["H7"]);

    component.props().clearHands();
    expect(store.getState().player.hands[0]).toEqual([]);
    expect(store.getState().dealer.hand).toEqual([]);
  });
});
