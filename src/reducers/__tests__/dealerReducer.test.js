import dealerReducer from '../dealerReducer'
import { takeCard, reset } from '../../actions/actions.js'
import { createStore } from 'redux'

describe("Test dealerReducer reducer", () => {
    it("takes a new card and calculates the new score", () => {
        const store = createStore(dealerReducer)
        store.dispatch(takeCard({ card: "SA" }))
        expect(store.getState().hand).toEqual(["SA"])
        expect(store.getState().score).toEqual(11)
    })

    it("takes multiple cards and calculates the new score correctly with aces", () => {
        const store = createStore(dealerReducer)
        store.dispatch(takeCard({ card: "SA" }))
        store.dispatch(takeCard({ card: "CA" }))
        expect(store.getState().hand).toEqual(["SA", "CA"])
        expect(store.getState().score).toEqual(12)
    })

    it("takes multiple cards and calculates the new score correctly with blackjack", () => {
        const store = createStore(dealerReducer)
        store.dispatch(takeCard({ card: "SA" }))
        store.dispatch(takeCard({ card: "CQ" }))
        expect(store.getState().hand).toEqual(["SA", "CQ"])
        expect(store.getState().score).toEqual(21)
        expect(store.getState().hasBlackjack).toEqual(true)
    })

    it("takes multiple cards and calculates the new score correctly with blackjack", () => {
        const store = createStore(dealerReducer)
        store.dispatch(takeCard({ card: "SA" }))
        store.dispatch(takeCard({ card: "CQ" }))
        expect(store.getState().hand).toEqual(["SA", "CQ"])
        store.dispatch(reset())
        expect(store.getState().hand).toEqual([])
    })
})