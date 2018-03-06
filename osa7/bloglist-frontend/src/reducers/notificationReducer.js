const initialState = {message: null, messageType: null}

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET':
            return {
                ...state,
                message: action.message,
                messageType: action.messageType,
            }
        default:
            return state
    }
}

export const setMessage = (message, messageType) => {
    return {type: 'SET', message, messageType}
}

export const resetMessage = () => {
    return {type: 'SET', message: null, messageType: null}
}

export const notifyWith = (message, messageType, duration) => {
    if (!duration) {
        duration = 5
    }
    return (dispatch) => {
        dispatch(setMessage(message, messageType))
        setTimeout(() => {
            dispatch(resetMessage())
        }, duration * 1000)
    }
}

export default notificationReducer