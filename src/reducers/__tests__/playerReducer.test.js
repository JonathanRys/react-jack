import '../../setupTests'

import playerReducer from '../playerReducer'
import { setName, setAvatar, takeCard, buyChips, setBet, loseBet, winBet, buyInsurance, reset, setInsured, credit, debit } from '../../actions/actions.js'
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
        expect(store.getState().hands[store.getState().playerIndex]).toEqual(["SA"])
        expect(store.getState().score[store.getState().playerIndex]).toEqual([11])
    })

    it("takes multiple cards and calculates the new score correctly with aces", () => {
        const store = createStore(playerReducer)
        store.dispatch(takeCard({ card: "SA" }))
        store.dispatch(takeCard({ card: "CA" }))
        expect(store.getState().hands[store.getState().playerIndex]).toEqual(["SA", "CA"])
        expect(store.getState().score[store.getState().playerIndex]).toEqual([12])
    })

    it("takes multiple cards and calculates the new score correctly with blackjack", () => {
        const store = createStore(playerReducer)
        store.dispatch(takeCard({ card: "SA" }))
        store.dispatch(takeCard({ card: "CQ" }))
        expect(store.getState().hands[store.getState().playerIndex]).toEqual(["SA", "CQ"])
        expect(store.getState().score[store.getState().playerIndex]).toEqual([21])
        expect(store.getState().hasBlackjack[store.getState().playerIndex]).toEqual([true])
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
        store.dispatch(loseBet())
        expect(store.getState().balance).toEqual(495)
    })

    it("adds the current bet times a multiplier to the player's balance", () => {
        const store = createStore(playerReducer)
        store.dispatch(buyChips({ newChips: 500 }))
        store.dispatch(setBet({ newBet: 5 }))
        // test WIN_BET
        store.dispatch(winBet())
        expect(store.getState().balance).toEqual(505)
        // Test WIN_BET with a multiplier
        store.dispatch(winBet({ multiplier: 1.5 }))
        expect(store.getState().balance).toEqual(512.5)
        // Test RESET
        store.dispatch(reset())
        expect(store.getState()).toEqual({
            name: "Player1",
            avatar: "./images/default.png",
            playerIndex: 0,

            balance: 0,
            currentBet: 0,

            hands: [[]],
            score: [[0]],
            busted: [[false]],
            hasBlackjack: [[false]],
            hasInsurance: [[false]],
            splitHand: false,
        })
    })

    it("is able to purchase insurance", () => {
        const store = createStore(playerReducer)
        store.dispatch(setInsured())
        expect(store.getState().hasInsurance[store.getState().playerIndex]).toEqual([true])
    })

    it("credits the account", () => {
        const store = createStore(playerReducer)
        store.dispatch(credit({ delta: 50 }))
        expect(store.getState().balance).toEqual(50)
    })

    it("debits the account", () => {
        const store = createStore(playerReducer)
        store.dispatch(credit({ delta: 50 }))
        store.dispatch(debit({ delta: 25 }))
        expect(store.getState().balance).toEqual(25)
    })
})