import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import './profile.css'

export default class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            playerName: props.name,
            playerAvatar: props.avatar
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onClick = () => {
        this.props.setName({ name: this.state.playerName })
        this.props.setAvatar({ avatar: this.state.playerAvatar })
    }

    render() {
        return (
            <Form className="Profile_main">
                <FormGroup>
                    <Label for="playerName">Player name</Label>
                    <Input type="text" name="playerName" id="playerName" onChange={this.onChange} value={this.state.playerName} />
                </FormGroup>
                <FormGroup>
                    <Label for="avatar">Avatar</Label>
                    <Input type="text" name="playerAvatar" id="playerAvatar" onChange={this.onChange} value={this.state.playerAvatar} />
                    <img className="avatar" alt="avatar" src={this.props.avatar} />
                </FormGroup>
                <Button onClick={this.onClick}>Change</Button>
            </Form>
        )
    }
}

Profile.propTypes = {
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    setName: PropTypes.func.isRequired,
    setAvatar: PropTypes.func.isRequired,
}
