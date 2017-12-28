import * as deckActions from '../actions/deckActions'
import * as turnActions from '../actions/turnActions'

export const dealStory = [turnActions.play, deckActions.newDeck, deckActions.shuffle, deckActions.drawOne]
