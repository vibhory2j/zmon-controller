export const selectAlert = id => ({
    type: 'SELECT_ALERT',
    id
})

export const invalidateAlert = alert => ({
    type: 'INVALIDATE_ALERT',
    alert
})

export const requestAlertChartData = () => ({
    type: 'REQUEST_ALERT_CHART_DATA'
})

export const receiveAlertChartData = (json) => ({
    type: 'RECEIVE_ALERT_CHART_DATA',
    data: json,
    receivedAt: Date.now()
})

export const requestAlerts = () => ({
    type: 'REQUEST_ALERTS'
})

export const receiveAlerts = (json) => ({
    type: 'RECEIVE_ALERTS',
    alerts: json,
    receivedAt: Date.now()
})

export const requestEntities = () => ({
    type: 'REQUEST_ENTITIES'
})

export const receiveEntities = (json) => ({
    type: 'RECEIVE_ENTITIES',
    entities: json,
    receivedAt: Date.now()
})

export const fetchAlertChartData = () => dispatch => {
    dispatch(requestAlertChartData())
    return fetch('http://localhost:3003/rest/chart-data')
        .then(response => response.json())
        .then(json => dispatch(receiveAlertChartData(json)))
}

export const fetchEntities = () => dispatch => {
    dispatch(requestEntities())
    return fetch('http://localhost:3003/rest/entities')
        .then(response => response.json())
        .then(json => setTimeout(() => dispatch(receiveEntities(json)), 3000))
}

const fetchAlerts = () => dispatch => {
    dispatch(requestAlerts())
    return fetch('http://localhost:3003/rest/allAlerts')
        .then(response => response.json())
        .then(json => dispatch(receiveAlerts(json)))
}

const shouldFetchAlerts = (state) => {
    const alerts = state.alertsReducer.alerts
    if (!alerts.length) {
        return true
    }
    if (state.alertsReducer.isFetching) {
        return false
    }
    return alerts.didInvalidate
}

export const fetchAlertsIfNeeded = () => (dispatch, getState) => {
    if (shouldFetchAlerts(getState())) {
        return dispatch(fetchAlerts())
    }
}

export const startPollAlerts = () => (dispatch, getState) => {
    dispatch(fetchAlertsIfNeeded())
    //setInterval(() => dispatch(fetchAlerts()), 5000)
}

export const clickAlert = id => (dispatch) => {
    dispatch(selectAlert(id))
    dispatch(fetchAlertChartData())
    dispatch(fetchEntities())
}
