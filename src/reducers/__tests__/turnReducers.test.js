import '../../setupTests'

import turnReducer from '../turnReducer'
import { play, hit, stand, split, doubleDown, buyInsurance } from '../../actions/actions.js'
import { createStore } from 'redux'

describe("Test turnReducer reducer", () => {
    it("dispatches PLAY action", () => {
        const store = createStore(turnReducer)
        store.dispatch(play())
        expect(true).not.toEqual(true)
    })

    it("dispatches HIT action", () => {
        const store = createStore(turnReducer)
        store.dispatch(hit())
        expect(true).not.toEqual(true)
    })

    it("dispatches STAND action", () => {
        const store = createStore(turnReducer)
        store.dispatch(stand())
        expect(true).not.toEqual(true)
    })

    it("dispatches SPLIT action", () => {
        const store = createStore(turnReducer)
        store.dispatch(split())
        expect(true).not.toEqual(true)
    })

    it("dispatches DOUBLE_DOWN action", () => {
        const store = createStore(turnReducer)
        store.dispatch(doubleDown())
        expect(true).not.toEqual(true)
    })

    it("dispatches BUY_INSURANCE action", () => {
        const store = createStore(turnReducer)
        store.dispatch(buyInsurance())
        expect(true).not.toEqual(true)
    })

})
