import React from 'react'
import { shallow } from 'enzyme'

import { PlayField } from '../PlayField'

const mockProps = { hands: [["SA", "CK"], ["D2", "HJ"]] }
describe("Test PlayField component", () => {
    it("matches the snapshot", () => {
        const component = shallow(<PlayField {...mockProps} />)
        expect(component).toMatchSnapshot()
    })

    it("should only render when the props have changed", () => {
        const component = shallow(<PlayField {...mockProps} />)
        const shouldntUpdate = component.instance().shouldComponentUpdate({ ...mockProps })
        expect(shouldntUpdate).toBe(false)
        // negative test
        mockProps.hands = [["SA", "CK"]]
        const shouldUpdate = component.instance().shouldComponentUpdate({ ...mockProps })
        expect(shouldUpdate).toBe(true)
    })
})