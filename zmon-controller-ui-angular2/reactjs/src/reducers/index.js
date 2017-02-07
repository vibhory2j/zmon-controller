import { combineReducers } from 'redux'
import alertsReducer from './alerts'
import userReducer from './user'

const rootReducer = combineReducers({
    alertsReducer,
    userReducer
})

export default rootReducer
