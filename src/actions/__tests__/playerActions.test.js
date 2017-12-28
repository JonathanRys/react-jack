import '../../setupTests'
import * as actions from '../../actions/playerActions.js'

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

    it("tests reset action creator", () => {
        const result = actions.reset("test")
        expect(result).toEqual({ type: "RESET" })
    })

    it("tests reset action creator", () => {
        const result = actions.reset("test")
        expect(result).toEqual({ type: "RESET" })
    })

    it("tests credit action creator", () => {
        const result = actions.credit("test")
        expect(result).toEqual({ type: "CREDIT", payload: "test" })
    })

    it("tests debit action creator", () => {
        const result = actions.debit("test")
        expect(result).toEqual({ type: "DEBIT", payload: "test" })
    })
})