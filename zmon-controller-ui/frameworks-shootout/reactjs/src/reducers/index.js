import { combineReducers } from 'redux'
import alertsReducer from './alerts'
import userReducer from './user'
import selectedAlertReducer from './selectedAlert'

const rootReducer = combineReducers({
    alertsReducer,
    userReducer,
    selectedAlertReducer
})

export default rootReducer
