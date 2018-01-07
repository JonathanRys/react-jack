import React from "react";
import "../../setupTests";

import { Button } from "reactstrap";

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

  it("handles onChange on the name", () => {
    const component = shallow(<Profile {...mockProps} />);

    const event = {
      target: {
        name: "playerAvatar",
        value: "Lester"
      }
    };
    const input = component.find("#playerName");
    input.simulate("change", event);
    expect(component.state().playerName).toEqual("Lester");

    const button = component.find(Button);
    button.simulate("click");

    expect(mockProps.setName).toHaveBeenCalledWith("Lester");
  });

  it("handles onClick on the male avatar", () => {
    const component = shallow(<Profile {...mockProps} />);

    const event = {
      target: {
        getAttribute: () => "./images/male.png"
      }
    };

    const input = component.find("#maleAvatar");
    input.simulate("click", event);
    expect(component.state().playerAvatar).toEqual("./images/male.png");

    const button = component.find(Button);
    button.simulate("click");
    expect(mockProps.setAvatar).toHaveBeenCalledWith("./images/male.png");
  });

  it("handles onClick on the female avatar", () => {
    const component = shallow(<Profile {...mockProps} />);

    const event = {
      target: {
        getAttribute: () => "./images/female.png"
      }
    };

    const input = component.find("#femaleAvatar");
    input.simulate("click", event);
    expect(component.state().playerAvatar).toEqual("./images/female.png");

    const button = component.find(Button);
    button.simulate("click");
    expect(mockProps.setAvatar).toHaveBeenCalledWith("./images/female.png");
  });
});
