import React, { Component } from "react";
import PropTypes from "prop-types";

import { Button, Form, FormGroup, Label, Input } from "reactstrap";

import "./profile.css";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerName: props.name,
      playerAvatar: props.avatar
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onClick = () => {
    this.props.setName(this.state.playerName);
    this.props.setAvatar(this.state.playerAvatar);
  };

  avatarOnClick = e => {
    this.setState({ playerAvatar: e.target.getAttribute("src") });
  };

  render() {
    return (
      <Form className="Profile_main">
        <FormGroup>
          <Label for="playerName">Player name</Label>
          <Input
            type="text"
            name="playerName"
            id="playerName"
            onChange={this.onChange}
            value={this.state.playerName}
          />
        </FormGroup>
        <FormGroup>
          <Label for="avatar">Avatar</Label>
          <br />
          <img
            id="defaultAvatar"
            className={`avatar ${
              this.state.playerAvatar === "./images/default.png"
                ? "selected"
                : ""
            }`}
            alt="default avatar"
            onClick={this.avatarOnClick}
            src="./images/default.png"
          />
          <img
            id="maleAvatar"
            className={`avatar ${
              this.state.playerAvatar === "./images/male.png" ? "selected" : ""
            }`}
            alt="male avatar"
            onClick={this.avatarOnClick}
            src="./images/male.png"
          />
          <img
            id="femaleAvatar"
            className={`avatar ${
              this.state.playerAvatar === "./images/female.png"
                ? "selected"
                : ""
            }`}
            onClick={this.avatarOnClick}
            alt="female avatar"
            src="./images/female.png"
          />
        </FormGroup>
        <Button onClick={this.onClick}>Change</Button>
      </Form>
    );
  }
}

Profile.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
  setAvatar: PropTypes.func.isRequired
};
