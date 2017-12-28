import React from 'react'
import { shallow } from 'enzyme'

import { Player } from '../Player'

const mockProps = { hands: [["SA", "SJ"]] }

describe("Test Hand component", () => {
    it("matches the snapshot", () => {
        const component = shallow(<Player {...mockProps} />)
        expect(component).toMatchSnapshot()
    })
})