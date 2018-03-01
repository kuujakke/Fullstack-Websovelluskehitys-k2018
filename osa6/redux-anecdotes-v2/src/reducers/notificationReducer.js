const initialState = {message: 'Teretulemast anekdoottisovellukseen!'}

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET':
            return {...state, message: action.message}
        case 'GET':
            return state.notification
        default:
            return state
    }
}

export const setMessage = (message) => {
    return {type: 'SET', message}
}

export const resetMessage = () => {
    return {type: 'SET', message: null}
}

export const notifyWith = (message, duration) => {
    return (dispatch) => {
        dispatch(setMessage(message))
        setTimeout(() => {
            dispatch(resetMessage())
        }, duration * 1000)
    }
}

export default notificationReducer