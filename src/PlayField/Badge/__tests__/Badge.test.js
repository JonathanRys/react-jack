import React from "react";

import "../../../setupTests";

import { shallow } from "enzyme";

import Badge from "../Badge";

const mockProps = {
  name: "Lester",
  avatar: "../images/default.png",
  score: 21,
  clearCard: jest.fn(),
  balance: 500,
  currentBet: 5,
  dealer: false
};

describe("Test Badge component", () => {
  it("renders Badge for player", () => {
    const component = shallow(<Badge {...mockProps} />);
    expect(component).toMatchSnapshot();
  });

  it("renders Badge for dealer", () => {
    const testProps = { ...mockProps };
    testProps.dealer = true;

    const component = shallow(<Badge {...testProps} />);
    expect(component).toMatchSnapshot();
  });
});
