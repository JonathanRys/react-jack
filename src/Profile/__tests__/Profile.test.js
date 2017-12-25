import React from 'react'
import '../../setupTests'

import { shallow } from 'enzyme'

import Profile from '../Profile'

describe("Test Profile component", () => {
    it("sets new player name", () => {
        const component = shallow(<Profile />)
        expect(component).toMatchSnapshot()
    })
})