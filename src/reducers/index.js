import { combineReducers } from 'redux'

import turnReducer from './turnReducer'
import deckReducer from './deckReducer'
import playerReducer from './playerReducer'
import dealerReducer from './dealerReducer'

export default combineReducers({
    turn: turnReducer,
    deck: deckReducer,
    player: playerReducer,
    dealer: dealerReducer,
})