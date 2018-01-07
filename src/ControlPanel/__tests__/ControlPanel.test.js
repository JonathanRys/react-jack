import React from "react";
import { shallow } from "enzyme";

import ControlPanel from "../ControlPanel";

import mockStore from "../../mockStore";

const mockProps = {
  ...mockStore,
  setStatus: jest.fn(),
  hitOnClick: jest.fn(),
  standOnClick: jest.fn(),
  winBet: jest.fn(),
  loseBet: jest.fn(),
  splitOnClick: jest.fn(),
  doubleDownOnClick: jest.fn(),
  buyInsuranceOnClick: jest.fn(),
  dealOnClick: jest.fn(),
  reset: jest.fn()
};

// test every permutation of state that applies to the game to make sure it operates as expected

describe("Test PlayField component", () => {
  it("matches the snapshot", () => {
    const testProps = { ...mockProps };
    const component = shallow(<ControlPanel {...testProps} />);
    expect(component).toMatchSnapshot();
  });

  it("test snapshot with isPlaying equal to true", () => {
    const testProps = { ...mockProps };
    testProps.turn.isPlaying = true;
    const component = shallow(<ControlPanel {...testProps} />);
    expect(component).toMatchSnapshot();
  });

  it("updates only when the props have changed", () => {
    const testProps = { ...mockProps };
    const component = shallow(<ControlPanel {...testProps} />);
    const shouldComponentUpdate = component.instance().shouldComponentUpdate;

    expect(shouldComponentUpdate.bind({ props: true })(true)).toEqual(false);
    expect(shouldComponentUpdate.bind({ props: true })(false)).toEqual(true);
    expect(shouldComponentUpdate.bind({ props: false })(true)).toEqual(true);
    expect(shouldComponentUpdate.bind({ props: false })(false)).toEqual(false);
  });

  it("dummy test for componentWillUpdate", () => {
    const testProps = { ...mockProps };
    testProps.turn.isPlaying = false;
    const component = shallow(<ControlPanel {...testProps} />);
    const componentWillUpdate = component.instance().componentWillUpdate;

    expect(componentWillUpdate(testProps)).toEqual(undefined);
  });

  it("sets the status if the componentWillUpdate", () => {
    const testProps = { ...mockProps };
    testProps.turn.isPlaying = true;
    const component = shallow(<ControlPanel {...testProps} />);
    const componentWillUpdate = component.instance().componentWillUpdate;

    expect(componentWillUpdate(testProps)).toEqual(undefined);
    expect(testProps.setStatus).toHaveBeenCalledWith(null);
  });

  it("ends the turn with buyInsuranceOnClick", () => {
    const testProps = { ...mockProps };
    testProps.turn.isPlaying = true;
    const component = shallow(<ControlPanel {...testProps} />);
    const buyInsuranceOnClick = component.instance().buyInsuranceOnClick;

    buyInsuranceOnClick();

    expect(testProps.buyInsuranceOnClick).toHaveBeenCalled();
    expect(testProps.standOnClick).toHaveBeenCalled();
  });

  it("switches onClick handlers when the dealer has blackjack", () => {
    const testProps = { ...mockProps };
    testProps.turn.isPlaying = true;
    testProps.dealer.hand = ["SA", "HJ"];
    testProps.dealer.hasBlackjack = true;
    const component = shallow(<ControlPanel {...testProps} />);

    expect(component).toMatchSnapshot();
  });
});
