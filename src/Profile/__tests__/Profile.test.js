import React from "react";
import "../../setupTests";

import { shallow } from "enzyme";

import Profile from "../Profile";

const mockProps = {
  name: "Lester",
  avatar: "./images/default.png",
  setName: jest.fn(),
  setAvatar: jest.fn()
};

describe("Test Profile component", () => {
  it("sets new player name", () => {
    const component = shallow(<Profile {...mockProps} />);
    expect(component).toMatchSnapshot();
  });
});
