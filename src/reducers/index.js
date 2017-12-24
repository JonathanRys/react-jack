import { combineReducers } from 'redux'

import turnReducer from './turnReducer'
import gameReducer from './gameReducer'
import bankReducer from './bankReducer'
import deckReducer from './deckReducer'
import playerReducer from './playerReducer'

export default combineReducers({
    turn: turnReducer,
    game: gameReducer,
    bank: bankReducer,
    deck: deckReducer,
    player: playerReducer
})