import '../../setupTests'
import * as actions from '../../actions/deckActions.js'

describe("Test deck-based actions", () => {
    it("tests newDeck action creator", () => {
        const result = actions.newDeck()
        expect(result).toEqual({ type: "NEW_DECK" })
    })

    it("tests cloneDeck action creator", () => {
        const result = actions.cloneDeck("test")
        expect(result).toEqual({ type: "CLONE_DECK", payload: "test" })
    })
    it("tests shuffle action creator", () => {
        const result = actions.shuffle()
        expect(result).toEqual({ type: "SHUFFLE" })
    })
    it("tests drawOne action creator", () => {
        const result = actions.drawOne()
        expect(result).toEqual({ type: "DRAW_ONE" })
    })

    it("tests drawOne action creator", () => {
        const result = actions.clearCard()
        expect(result).toEqual({ type: "CLEAR_CARD" })
    })
})