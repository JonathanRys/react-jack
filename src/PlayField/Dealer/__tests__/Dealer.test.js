import React from "react";
import { shallow } from "enzyme";

import Dealer from "../Dealer";

const mockProps = {
  hand: [["SA", "SJ"]],
  flipped: true,
  drawnCard: null,
  takeCard: jest.fn(),
  clearCard: jest.fn()
};

describe("Test Hand component", () => {
  it("matches the snapshot", () => {
    const testProps = { ...mockProps };
    const component = shallow(<Dealer {...testProps} />);
    expect(component).toMatchSnapshot();
    expect(testProps.takeCard).not.toHaveBeenCalled();
    expect(testProps.clearCard).not.toHaveBeenCalled();
  });

  it("matches the snapshot", () => {
    const testProps = { ...mockProps };
    testProps.drawnCard = "D5";
    const component = shallow(<Dealer {...testProps} />);
    expect(component).toMatchSnapshot();
  });

  it("matches the snapshot", () => {
    const testProps = { ...mockProps };
    testProps.drawnCard = "D5";
    testProps.flipped = false;
    const component = shallow(<Dealer {...testProps} />);
    expect(component).toMatchSnapshot();
  });
});
