import React from 'react'
import { shallow } from 'enzyme'

import Hand from '../Hand'

const mockProps = { hand: ["SA", "SJ"], dealer: false }

describe("Test Hand component", () => {
    it("matches the snapshot", () => {
        const testProps = { ...mockProps }
        const component = shallow(<Hand {...testProps} />)
        expect(component).toMatchSnapshot()
    })

    it("matches the snapshot", () => {
        const testProps = { ...mockProps }
        testProps.dealer = true
        const component = shallow(<Hand {...testProps} />)
        expect(component).toMatchSnapshot()
    })
})