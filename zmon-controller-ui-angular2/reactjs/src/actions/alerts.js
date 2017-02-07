export const selectAlert = alert => ({
  type: 'SELECT_ALERT',
  alert
})

export const selectTest = test => ({
    type: 'SELECT_TEST',
    test
})

export const invalidateAlert = alert => ({
  type: 'INVALIDATE_ALERT',
  alert
})

export const requestAlerts = () => ({
  type: 'REQUEST_ALERTS'
})

export const receiveAlerts = (json) => ({
  type: 'RECEIVE_ALERTS',
  alerts: json,
  receivedAt: Date.now()
})

const fetchAlerts = () => dispatch => {
    dispatch(requestAlerts())
    return fetch('http://localhost:3003/rest/allAlerts')
        .then(response => response.json())
        .then(json => dispatch(receiveAlerts(json)));
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
