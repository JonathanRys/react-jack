import React from 'react'
import { shallow } from 'enzyme'

import { Hand } from '../Hand'

const mockProps = { cards: ["SA", "SJ"], faceUp: true }

describe("Test Hand component", () => {
    it("matches the snapshot", () => {
        const component = shallow(<Hand {...mockProps} />)
        expect(component).toMatchSnapshot()
    })
})