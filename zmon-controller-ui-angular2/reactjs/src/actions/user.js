export const requestUserData = () => ({
    type: 'REQUEST_USERDATA'
})

export const receiveUserData = (json) => ({
    type: 'RECEIVE_USERDATA',
    user: json,
    receivedAt: Date.now()
})

export const fetchUserData = () => dispatch => {
    dispatch(requestUserData())
    return fetch('http://localhost:3003/rest/user')
        .then(response => response.json())
        .then(json => dispatch(receiveUserData(json)))
}
