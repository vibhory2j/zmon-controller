const selectedAlertReducer = ( state = {  }, action) => {
    switch(action.type) {
        case 'SELECT_ALERT':
            return {
                ...state,
                selectedAlert: action.id
            }
        default:
            return state
    }
}

export default selectedAlertReducer
