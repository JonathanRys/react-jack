import React from 'react'
import { shallow } from 'enzyme'

import ControlPanel from "../ControlPanel"

import mockStore from "../../mockStore"

const mockProps = {
    ...mockStore,
    hitOnClick: jest.fn(),
    standOnClick: jest.fn(),
    winBet: jest.fn(),
    loseBet: jest.fn(),
    splitOnClick: jest.fn(),
    doubleDownOnClick: jest.fn(),
    buyInsuranceOnClick: jest.fn(),
    dealOnClick: jest.fn(),
    reset: jest.fn(),
}

describe("Test PlayField component", () => {
    it("matches the snapshot", () => {
        const testProps = { ...mockProps }
        const component = shallow(<ControlPanel {...testProps} />)
        expect(component).toMatchSnapshot()
    })
})
