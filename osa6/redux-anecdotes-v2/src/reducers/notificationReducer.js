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

export default notificationReducer