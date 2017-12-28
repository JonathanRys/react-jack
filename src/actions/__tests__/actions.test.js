import '../../setupTests'

import * as actions from '../../actions/actions.js'

describe("Test action creators", () => {
    describe("Test turn-based actions", () => {
        it("tests play action creator", () => {
            const result = actions.play("test")
            expect(result).toEqual({ type: "PLAY" })
        })

        it("tests addPlayer action creator", () => {
            const result = actions.addPlayer("test")
            expect(result).toEqual({ type: "ADD_PLAYER" })
        })

        it("tests nextPlayer action creator", () => {
            const result = actions.nextPlayer("test")
            expect(result).toEqual({ type: "NEXT_PLAYER" })
        })

        it("tests hit action creator", () => {
            const result = actions.hit("test")
            expect(result).toEqual({ type: "HIT", payload: "test" })
        })

        it("tests stand action creator", () => {
            const result = actions.stand("test")
            expect(result).toEqual({ type: "STAND", payload: "test" })
        })

        it("tests split action creator", () => {
            const result = actions.split("test")
            expect(result).toEqual({ type: "SPLIT", payload: "test" })
        })

        it("tests doubleDown action creator", () => {
            const result = actions.doubleDown("test")
            expect(result).toEqual({ type: "DOUBLE_DOWN", payload: "test" })
        })

        it("tests buyInsurance action creator", () => {
            const result = actions.buyInsurance("test")
            expect(result).toEqual({ type: "BUY_INSURANCE", payload: "test" })
        })
    })

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
    })

    describe("Test player-based actions", () => {
        it("tests setName action creator", () => {
            const result = actions.setName("test")
            expect(result).toEqual({ type: "SET_NAME", payload: "test" })
        })

        it("tests setAvatar action creator", () => {
            const result = actions.setAvatar("test")
            expect(result).toEqual({ type: "SET_AVATAR", payload: "test" })
        })

        it("tests takeCard action creator", () => {
            const result = actions.takeCard("test")
            expect(result).toEqual({ type: "TAKE_CARD", payload: "test" })
        })

        it("tests buyChips action creator", () => {
            const result = actions.buyChips("test")
            expect(result).toEqual({ type: "BUY_CHIPS", payload: "test" })
        })

        it("tests loseBet action creator", () => {
            const result = actions.loseBet("test")
            expect(result).toEqual({ type: "LOSE_BET" })
        })

        it("tests setBet action creator", () => {
            const result = actions.setBet("test")
            expect(result).toEqual({ type: "SET_BET", payload: "test" })
        })

        it("tests winBet action creator", () => {
            const result = actions.winBet("test")
            expect(result).toEqual({ type: "WIN_BET", payload: "test" })
        })

        it("tests setInsured action creator", () => {
            const result = actions.setInsured("test")
            expect(result).toEqual({ type: "SET_INSURED" })
        })

        it("tests reset action creator", () => {
            const result = actions.reset("test")
            expect(result).toEqual({ type: "RESET" })
        })
    })
})
