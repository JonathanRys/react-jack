import '../../setupTests'

import playerReducer from '../playerReducer'
import { setName, setAvatar, takeCard, buyChips, setBet, deductBet, collectChips } from '../../actions/actions.js'
import { createStore } from 'redux'

describe("Test playerReducer reducer", () => {
    it("sets new player name", () => {
        const store = createStore(playerReducer)
        store.dispatch(setName({ name: "Lester" }))
        expect(store.getState().name).toEqual("Lester")
    })

    it("sets a new avatar", () => {
        const store = createStore(playerReducer)
        store.dispatch(setAvatar({ avatar: "./images/test.png" }))
        expect(store.getState().avatar).toEqual("./images/test.png")
    })

    it("takes a new card and calculates the new score", () => {
        const store = createStore(playerReducer)
        store.dispatch(takeCard({ card: "SA" }))
        expect(store.getState().cards[store.getState().handIndex]).toEqual(["SA"])
        expect(store.getState().score[store.getState().handIndex]).toEqual(11)
    })

    it("takes multiple cards and calculates the new score correctly with aces", () => {
        const store = createStore(playerReducer)
        store.dispatch(takeCard({ card: "SA" }))
        store.dispatch(takeCard({ card: "CA" }))
        expect(store.getState().cards[store.getState().handIndex]).toEqual(["SA", "CA"])
        expect(store.getState().score[store.getState().handIndex]).toEqual(12)
    })

    it("credit given amount to player's balance", () => {
        const store = createStore(playerReducer)
        store.dispatch(buyChips({ newChips: 500 }))
        expect(store.getState().balance).toEqual(500)
    })

    it("set the current bet", () => {
        const store = createStore(playerReducer)
        store.dispatch(setBet({ newBet: 5 }))
        expect(store.getState().currentBet).toEqual(5)
    })

    it("deducts given amount from player's balance", () => {
        const store = createStore(playerReducer)
        store.dispatch(buyChips({ newChips: 500 }))
        store.dispatch(setBet({ newBet: 5 }))
        store.dispatch(deductBet())
        expect(store.getState().balance).toEqual(495)
    })
})