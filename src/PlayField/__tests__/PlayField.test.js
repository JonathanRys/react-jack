import React from "react";
import { shallow } from "enzyme";

import PlayField from "../PlayField";

import mockStore from "../../mockStore";

describe("Test PlayField component", () => {
  it("tests playersTurn", () => {
    const testProps = { ...mockStore };
    testProps.turn.playersTurn = 0;
    const component = shallow(<PlayField {...testProps} />);
    expect(component).toMatchSnapshot();
  });

  it("tests playersTurn", () => {
    const testProps = { ...mockStore };
    testProps.turn.playersTurn = 1;
    const component = shallow(<PlayField {...testProps} />);
    expect(component).toMatchSnapshot();
  });
});
