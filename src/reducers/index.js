import { combineReducers } from 'redux'

import turnReducer from './turnReducer'
import bankReducer from './bankReducer'
import deckReducer from './deckReducer'
import playerReducer from './playerReducer'

export default combineReducers({
    turn: turnReducer,
    bank: bankReducer,
    deck: deckReducer,
    player: playerReducer
})