const alertsReducer = (state = { alerts:[], isFetching: false }, action) => {
    switch(action.type) {
        case 'SELECT_ALERT':
            return {
                ...state,
                selectedAlert: state.alerts.filter(
                    alert => alert.id === action.id
                )[0]
            }
        case 'INVALIDATE_ALERT':
            return {
                ...state,
                didInvalidate: true
            }
        case 'REQUEST_ALERT_CHART_DATA':
            return {
                ...state,
                isFetching: true
            }
        case 'RECEIVE_ALERT_CHART_DATA':
            return {
                ...state,
                data: action.data,
                lastUpdated: action.receivedAt
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
