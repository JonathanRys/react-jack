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
})