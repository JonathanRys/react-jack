import React, { Component } from 'react'
// import PropTypes from 'prop-types'

import { Button, Form, Label } from 'reactstrap'

import { connect } from 'react-redux'

export class ControlPanel extends Component {
    // shouldComponentUpdate(nextProps) {
    //     return true;
    // }

    render() {
        return (
            <Form style={{ width: "20%", float: "right", margin: "8px", padding: "20px", border: "1px solid black", borderRadius: "10px" }}>
                <Label style={{ fontSize: "1.6em", fontWeight: "bold" }}>Control Panel</Label>
                <Button size="lg" color="secondary" block onClick={this.hitOnClick}>Hit</Button>
                <Button size="lg" color="secondary" block onClick={this.hitOnClick}>Stand</Button>
                <Button size="lg" color="secondary" block onClick={this.hitOnClick}>Split</Button>
                <Button size="lg" color="secondary" block onClick={this.hitOnClick}>Double Down</Button>
                <Button size="lg" color="secondary" block onClick={this.hitOnClick}>Buy Insurance</Button>
                <Button size="lg" color="primary" block onClick={this.hitOnClick}>Deal</Button>

            </Form>
        )
    }
}

// ControlPanel.propTypes = {

// }

export default connect()(ControlPanel)
