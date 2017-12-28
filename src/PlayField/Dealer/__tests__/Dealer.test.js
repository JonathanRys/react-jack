import React from 'react'
import { shallow } from 'enzyme'

import { Dealer } from '../Dealer'

const mockProps = { hands: [["SA", "SJ"]] }

describe("Test Hand component", () => {
    it("matches the snapshot", () => {
        const component = shallow(<Dealer {...mockProps} />)
        expect(component).toMatchSnapshot()
    })
})