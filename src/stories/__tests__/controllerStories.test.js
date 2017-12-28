import { dealStory } from '../controllerStories'

import * as deckActions from '../../actions/deckActions'
import * as turnActions from '../../actions/turnActions'


const deal = [turnActions.play, deckActions.newDeck, deckActions.shuffle, deckActions.drawOne]

describe("Test controller stories", () => {
    it("returns an array", () => {
        expect(dealStory).toEqual(expect.arrayContaining(deal))
    })
})


