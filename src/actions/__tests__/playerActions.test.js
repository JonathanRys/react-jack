import "../../setupTests";
import * as actions from "../../actions/playerActions.js";

describe("Test player-based actions", () => {
  it("tests setName action creator", () => {
    const result = actions.setName("test");
    expect(result).toEqual({ type: "SET_NAME", payload: "test" });
  });

  it("tests setAvatar action creator", () => {
    const result = actions.setAvatar("test");
    expect(result).toEqual({ type: "SET_AVATAR", payload: "test" });
  });

  it("tests setStatus action creator", () => {
    const result = actions.setStatus("test");
    expect(result).toEqual({ type: "SET_STATUS", payload: "test" });
  });

  it("tests takeCard action creator", () => {
    const result = actions.takeCard("test");
    expect(result).toEqual({ type: "TAKE_CARD", payload: "test" });
  });

  it("tests clearHands action creator", () => {
    const result = actions.clearHands("test");
    expect(result).toEqual({ type: "CLEAR_HANDS" });
  });

  it("tests flipHand action creator", () => {
    const result = actions.flipHand("test");
    expect(result).toEqual({ type: "FLIP_HAND" });
  });

  it("tests dealerTakeCard action creator", () => {
    const result = actions.dealerTakeCard("test");
    expect(result).toEqual({ type: "DEALER_TAKE_CARD", payload: "test" });
  });

  it("tests stand action creator", () => {
    const result = actions.stand();
    expect(result).toEqual({ type: "STAND" });
  });

  it("tests setDoubleDown action creator", () => {
    const result = actions.setDoubleDown();
    expect(result).toEqual({ type: "SET_DOUBLE_DOWN" });
  });

  it("tests buyChips action creator", () => {
    const result = actions.buyChips("test");
    expect(result).toEqual({ type: "BUY_CHIPS", payload: "test" });
  });

  it("tests deductBet action creator", () => {
    const result = actions.deductBet("test");
    expect(result).toEqual({ type: "DEDUCT_BET" });
  });

  it("tests setBet action creator", () => {
    const result = actions.setBet("test");
    expect(result).toEqual({ type: "SET_BET", payload: "test" });
  });

  it("tests winBet action creator", () => {
    const result = actions.winBet("test");
    expect(result).toEqual({ type: "WIN_BET", payload: "test" });
  });

  it("tests setInsured action creator", () => {
    const result = actions.setInsured("test");
    expect(result).toEqual({ type: "SET_INSURED" });
  });

  it("tests credit action creator", () => {
    const result = actions.credit("test");
    expect(result).toEqual({ type: "CREDIT", payload: "test" });
  });

  it("tests debit action creator", () => {
    const result = actions.debit("test");
    expect(result).toEqual({ type: "DEBIT", payload: "test" });
  });
});
