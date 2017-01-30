export const selectAlert = alert => ({
  type: 'SELECT_ALERT',
  alert
})

export const invalidateAlert = alert => ({
  type: 'INVALIDATE_alert',
  alert
})

export const requestAlerts = alert => ({
  type: 'REQUEST_ALERTS',
  alert
})

export const receiveAlerts = (alert, json) => ({
  type: 'RECEIVE_ALERTS',
  alert,
  alerts: json,
  receivedAt: Date.now()
})

const fetchAlerts = alert => dispatch => {
    dispatch(requestAlerts(alert))
    return fetch('http://localhost:3003/rest/allAlerts')
        .then(response => response.json())
        .then(json => dispatch(receiveAlerts(alert, json)));
}

const shouldFetchAlerts = (state, alert) => {
    const alerts = state.alertsByZ[alert]
    if (!alerts) {
        return true
    }
    if (alerts.isFetching) {
        return false
    }
    return alerts.didInvalidate
}

export const fetchAlertsIfNeeded = alert => (dispatch, getState) => {
    if (shouldFetchAlerts(getState(), alert)) {
        return dispatch(fetchAlerts(alert))
    }
}
