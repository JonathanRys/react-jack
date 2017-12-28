import React from 'react'
import { shallow } from 'enzyme'

import Card from '../Card'

const mockProps = { card: "SA", faceUp: false }

describe("Test Card component", () => {
    it("should display the correct card", () => {
        let component = shallow(<Card {...mockProps} />)
        expect(component).toMatchSnapshot()

        // test with faceUp = true
        mockProps.faceUp = true
        component = shallow(<Card {...mockProps} />)
        expect(component).toMatchSnapshot()

        // test shouldComponentUpdate
        component = shallow(<Card {...mockProps} />)
        expect(component).toMatchSnapshot()
    })

    it("should only render when the props have changed", () => {
        const component = shallow(<Card {...mockProps} />)
        const shouldntUpdate = component.instance().shouldComponentUpdate({ ...mockProps })
        expect(shouldntUpdate).toBe(false)
        // negative test
        mockProps.faceUp = 0
        const shouldUpdate = component.instance().shouldComponentUpdate({ ...mockProps })
        expect(shouldUpdate).toBe(true)
    })
})
