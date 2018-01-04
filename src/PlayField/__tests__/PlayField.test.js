import React from "react";
import { shallow } from "enzyme";

import PlayField from "../PlayField";

import mockStore from "../../mockStore";
import { dealerAddCard } from "../../reducers/dealerHelpers";

const mockProps = {
  ...mockStore,
  giveCard: jest.fn(),
  giveDealerCard: jest.fn(),
  clearCard: jest.fn()
};

describe("Test PlayField component", () => {
  it("matches the snapshot", () => {
    const testProps = { ...mockProps };
    const component = shallow(<PlayField {...testProps} />);
    expect(component).toMatchSnapshot();
  });

  it("tests playersTurn", () => {
    const testProps = { ...mockProps };
    testProps.turn.playersTurn = 1;
    const component = shallow(<PlayField {...testProps} />);
    expect(component).toMatchSnapshot();
  });
});
