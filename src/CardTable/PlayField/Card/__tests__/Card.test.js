import React from 'react'
import { shallow } from 'enzyme'

import Card from '../Card'

const mockProps = { card: "SA", faceUp: false }

describe("Test Card component", () => {
    it("should display the correct card", () => {
        let component = shallow(<Card {...mockProps} />)
        expect(component).toMatchSnapshot()

        mockProps.faceup = true

        component = shallow(<Card {...mockProps} />)
        expect(component).toMatchSnapshot()
    })
})
