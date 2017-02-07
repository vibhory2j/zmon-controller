const userReducer = (state = { user: {}, isFetching: false }, action) => {
    switch(action.type) {
        case 'REQUEST_USERDATA':
            return {
                ...state,
                isFetching: true
            }
        case 'RECEIVE_USERDATA':
            return {
                ...state,
                user: action.user,
                isFetching: false
            }

        default:
            return state
    }
}

export default userReducer
