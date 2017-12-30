import React from 'react'
import { shallow } from 'enzyme'

import Dealer from '../Dealer'

const mockProps = {
    hand: [["SA", "SJ"]],
    drawnCard: null,
    takeCard: jest.fn(),
    clearCard: jest.fn(),
}

describe("Test Hand component", () => {
    it("matches the snapshot", () => {
        const component = shallow(<Dealer {...mockProps} />)
        expect(component).toMatchSnapshot()
    })
})