const alertsReducer = (state = { alerts:[], isFetching: false }, action) => {
    switch(action.type) {
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
                alerts: action.alerts,
                lastUpdated: action.receivedAt
            }
        default:
            return state
    }
}

export default alertsReducer
