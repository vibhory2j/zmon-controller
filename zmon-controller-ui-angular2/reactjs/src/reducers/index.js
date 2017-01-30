import { combineReducers } from 'redux'

const selectedAlert = (state = 'reactjs', action) => {
    switch (action.type) {
        case 'SELECT_ALERT':
            return action.alert;
        default:
            return state
    }
}

const allAlerts = (state = {
    isFetching: false,
    didInvalidate: false,
    items: []
}, action) => {
    switch (action.type) {
        case 'INVALIDATE_ALERT':
            return {
                ...state,
                didInvalidate: true
            }
        case 'REQUEST_ALERTS':
            return {
                ...state,
                isFetching: true,
                didInvalidate: false
            }
        case 'RECEIVE_ALERTS':
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                items: action.alerts,
                lastUpdated: action.receivedAt
            }
        default:
            return state
    }
}

const alertsByZ = (state = { }, action) => {
    switch(action.type) {
        case 'INVALIDATE_ALERT':
        case 'RECEIVE_ALERTS':
        case 'REQUEST_ALERTS':
            return {
                ...state,
                [action.alert]: allAlerts(state[action.alert], action)
            }
        default:
            return state

    }
}

const rootReducer = combineReducers({
    alertsByZ,
    selectedAlert
})

export default rootReducer
