import '../../setupTests'

import bankReducer from '../bankReducer'
import { credit, debit } from '../../actions/actions.js'
import { createStore } from 'redux'

describe("Test bankReducer reducer", () => {
    it("credits the account", () => {
        const store = createStore(bankReducer)
        store.dispatch(credit({ delta: 50 }))
        expect(store.getState().balance).toEqual(50)
    })

    it("debits the account", () => {
        const store = createStore(bankReducer)
        store.dispatch(credit({ delta: 50 }))
        store.dispatch(debit({ delta: 25 }))
        expect(store.getState().balance).toEqual(25)
    })
})