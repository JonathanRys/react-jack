import React from 'react'
import { shallow } from 'enzyme'

import Hand from '../Hand'

const mockProps = {
    hand: ["SA", "SJ"],
    dealer: false,
    handFlipped: false
}

describe("Test Hand component", () => {
    it("matches the snapshot", () => {
        const testProps = { ...mockProps }
        const component = shallow(<Hand {...testProps} />)
        expect(component).toMatchSnapshot()
    })

    it("matches the snapshot with handFlipped = true", () => {
        const testProps = { ...mockProps }
        testProps.handFlipped = true
        const component = shallow(<Hand {...testProps} />)
        expect(component).toMatchSnapshot()
    })

    it("matches the snapshot with dealer = true", () => {
        const testProps = { ...mockProps }
        testProps.dealer = true
        const component = shallow(<Hand {...testProps} />)
        expect(component).toMatchSnapshot()
    })
})