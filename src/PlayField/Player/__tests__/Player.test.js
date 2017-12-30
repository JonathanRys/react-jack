import React from 'react'
import { shallow } from 'enzyme'

import Player from '../Player'

const mockProps = {
    hands: [["SA", "SJ"]],
    drawnCard: null,
    giveCard: jest.fn(),
    clearCard: jest.fn(),
}

describe("Test Hand component", () => {
    it("matches the snapshot", () => {
        const testProps = { ...mockProps }
        const component = shallow(<Player {...testProps} />)
        expect(component).toMatchSnapshot()
        // expect(testProps.giveCard).not.toHaveBeenCalled()
        // expect(testProps.clearCard).not.toHaveBeenCalled()
    })

    it("matches the snapshot after drawing a card", () => {
        const testProps = { ...mockProps }
        testProps.drawnCard = "S7"
        const component = shallow(<Player {...testProps} />)
        expect(component).toMatchSnapshot()
    })
})