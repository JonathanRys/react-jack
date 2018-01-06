import React from "react";
import { shallow } from "enzyme";

import Dealer from "../Dealer";

const mockProps = {
  hand: [["SA", "SJ"]],
  flipped: true
};

describe("Test Hand component", () => {
  it("matches the snapshot", () => {
    const testProps = { ...mockProps };
    const component = shallow(<Dealer {...testProps} />);
    expect(component).toMatchSnapshot();
  });
});
