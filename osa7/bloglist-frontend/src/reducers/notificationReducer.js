const initialState = {message: null, messageType: null}

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET':
            return {
                ...state,
                message: action.message,
                error: action.error,
                success: action.success,
            }
        default:
            return state
    }
}

export const setMessage = (message, error, success) => {
    return {type: 'SET', message, error, success}
}

export const resetMessage = () => {
    return {type: 'SET', message: null, error: false, success: false}
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