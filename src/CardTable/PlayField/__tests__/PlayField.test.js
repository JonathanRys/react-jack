import React from 'react'
import { shallow } from 'enzyme'

import PlayField from '../PlayField'

describe("Test PlayField component", () => {
    it("matches the snapshot", () => {
        const component = shallow(<PlayField />)
        expect(component).toMatchSnapshot()
    })
})