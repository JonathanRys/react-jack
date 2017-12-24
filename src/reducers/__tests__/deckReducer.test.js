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
        expect(store.getState().deck).not.toEqual([])
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