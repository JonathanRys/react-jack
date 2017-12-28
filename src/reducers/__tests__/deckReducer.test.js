import '../../setupTests'

import deckReducer from '../deckReducer'
import { newDeck, cloneDeck, shuffle, drawOne } from '../../actions/actions.js'
import { createStore } from 'redux'

describe("Test deckReducer reducer", () => {
    it("creates a new deck", () => {
        // Create the store
        const store = createStore(deckReducer)
        // Build a new deck
        store.dispatch(newDeck())
        expect(store.getState().deck).toEqual([
            "S2", "S3", "S4", "S5", "S6", "S7", "S8", "S9", "S10", "SJ", "SQ", "SK", "SA",
            "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10", "CJ", "CQ", "CK", "CA",
            "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10", "DJ", "DQ", "DK", "DA",
            "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9", "H10", "HJ", "HQ", "HK", "HA"
        ])
    })

    it("clones a deck", () => {
        // Create the store
        const store = createStore(deckReducer)
        // Build a new deck
        store.dispatch(newDeck())
        // Save the current deck
        const deck = store.getState().deck
        // Clone the deck
        store.dispatch(cloneDeck({ numDecks: 2 }))
        expect(store.getState().deck).toEqual([...deck, ...deck])
    })

    it("shuffles the deck", () => {
        // Create the store
        const store = createStore(deckReducer)
        // Build a new deck
        store.dispatch(newDeck())
        // Save the current deck
        const deck = store.getState().deck
        // Shuffle the deck
        store.dispatch(shuffle())
        expect(store.getState().deck).not.toEqual(deck)
    })

    it("draws a card", () => {
        // Create the store
        const store = createStore(deckReducer)
        // Build a new deck
        store.dispatch(newDeck())
        // Draw a card
        store.dispatch(drawOne())
        expect(store.getState().drawnCard).not.toEqual(null)
    })
})