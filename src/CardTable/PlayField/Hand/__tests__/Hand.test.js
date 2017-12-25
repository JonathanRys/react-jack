import React from 'react'
import { shallow } from 'enzyme'

import Hand from '../Hand'

const mockProps = { hand: ["SA", "SJ"], faceUp: 1 }

describe("Test Hand component", () => {
    it("matches the snapshot", () => {
        const component = shallow(<Hand {...mockProps} />)
        expect(component).toMatchSnapshot()
    })

    it("should only render when the props have changed", () => {
        const component = shallow(<Hand {...mockProps} />)
        const shouldntUpdate = component.instance().shouldComponentUpdate({ ...mockProps })
        expect(shouldntUpdate).toBe(false)
        // negative test
        mockProps.faceUp = 0
        const shouldUpdate = component.instance().shouldComponentUpdate({ ...mockProps })
        expect(shouldUpdate).toBe(true)
    })
})