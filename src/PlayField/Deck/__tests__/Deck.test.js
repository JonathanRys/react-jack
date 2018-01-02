import React from "react";
import { shallow } from "enzyme";

import Deck from "../Deck";

// const mockProps = { cards: ["SA", "SJ"] }

describe("Test Deck component", () => {
  it("", () => {
    const component = shallow(<Deck />);
    expect(component).toMatchSnapshot();
  });
});
