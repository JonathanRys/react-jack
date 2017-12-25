import React from 'react'
import { shallow } from 'enzyme'

import { PlayField } from '../PlayField'

const mockProps = { hands: [["SA", "CK"], ["D2", "HJ"]] }

describe("Test PlayField component", () => {
    it("matches the snapshot", () => {
        const testProps = { ...mockProps }
        const component = shallow(<PlayField {...testProps} />)
        expect(component).toMatchSnapshot()
    })

    it("should only render when the props have changed", () => {
        const testProps = { ...mockProps }
        const component = shallow(<PlayField {...testProps} />)
        const shouldntUpdate = component.instance().shouldComponentUpdate({ ...testProps })
        expect(shouldntUpdate).toBe(false)
        // negative test
        testProps.hands = [["H9", "D5"], ["CA", "HQ"]]
        const shouldUpdate = component.instance().shouldComponentUpdate({ ...testProps })
        expect(shouldUpdate).toBe(true)
    })
})