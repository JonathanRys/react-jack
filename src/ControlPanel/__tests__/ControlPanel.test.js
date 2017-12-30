import React from 'react'
import { shallow } from 'enzyme'

import ControlPanel from "../ControlPanel"

import mockStore from "../../mockStore"

const mockProps = {
    ...mockStore
}

describe("Test PlayField component", () => {
    it("matches the snapshot", () => {
        const testProps = { ...mockProps }
        const component = shallow(<ControlPanel {...testProps} />)
        expect(component).toMatchSnapshot()
    })
})
