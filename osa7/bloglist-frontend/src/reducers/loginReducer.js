import loginService from '../services/login'

const loginReducer = (store = {}, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {...action.user}
        case 'LOGOUT':
            return {}
        default:
            return store
    }
}

export const loginUser = (credentials) => {
    return async (dispatch) => {
        const user = await loginService.login(credentials)
        window.localStorage.setItem('loggedUser', JSON.stringify(user))

        dispatch({type: 'LOGIN', user})
    }
}

export const setUser = (user) => {
    return (dispatch) => {
        dispatch({type: 'LOGIN', user})
    }
}

export const logoutUser = () => {
    return (dispatch) => {
        window.localStorage.removeItem('loggedUser')
        dispatch({type: 'LOGOUT'})
    }
}

export default loginReducer