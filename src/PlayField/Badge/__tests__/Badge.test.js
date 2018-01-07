import React from "react";

import "../../../setupTests";

import { shallow } from "enzyme";

import Badge from "../Badge";

const mockProps = {
  name: "Lester",
  avatar: "../images/default.png",
  score: 21,
  balance: 500,
  currentBet: 5,
  dealer: false,
  flipped: false
};

describe("Test Badge component", () => {
  it("renders Badge for player", () => {
    const component = shallow(<Badge {...mockProps} />);
    expect(component).toMatchSnapshot();
  });

  it("renders Badge for dealer", () => {
    const testProps = { ...mockProps };
    testProps.dealer = true;
    testProps.balance = null;

    const component = shallow(<Badge {...testProps} />);
    expect(component).toMatchSnapshot();
  });

  it("decreases the players balance when onDecrement is called", () => {
    const testProps = { ...mockProps };
    testProps.setBet = jest.fn();

    const component = shallow(<Badge {...testProps} />);
    component.instance().onDecrement();

    expect(testProps.setBet).toHaveBeenCalledWith(4);
  });

  it("increases the players balance when onIncrement is called", () => {
    const testProps = { ...mockProps };
    testProps.setBet = jest.fn();

    const component = shallow(<Badge {...testProps} />);
    component.instance().onIncrement();

    expect(testProps.setBet).toHaveBeenCalledWith(6);
  });
});
