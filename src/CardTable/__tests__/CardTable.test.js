import React from 'react'
import { shallow } from 'enzyme'

import CardTable from '../CardTable'


describe("Test CardTable component", () => {
    it("matches the snapshot", () => {
        const component = shallow(<CardTable />)
        expect(component).toMatchSnapshot()
    })
})