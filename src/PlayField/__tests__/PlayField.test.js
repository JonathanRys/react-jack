import React from 'react'
import { shallow } from 'enzyme'

import PlayField from '../PlayField'

import mockStore from "../../mockStore"

const mockProps = {
    ...mockStore,
    giveCard: jest.fn(),
    giveDealerCard: jest.fn(),
    clearCard: jest.fn()
}

describe("Test PlayField component", () => {
    it("matches the snapshot", () => {
        const testProps = { ...mockProps }
        const component = shallow(<PlayField {...testProps} />)
        expect(component).toMatchSnapshot()
    })
})