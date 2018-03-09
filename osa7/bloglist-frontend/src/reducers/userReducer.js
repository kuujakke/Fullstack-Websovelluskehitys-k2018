import userService from '../services/users'

const userReducer = (store = [], action) => {
    switch (action.type) {
        case 'INIT-USERS':
            return [...action.data]
        default:
            return store
    }
}

export const initializeUsers = () => {
    return async (dispatch) => {
        const users = await userService.getAll()
        dispatch({type: 'INIT-USERS', data: users})
    }
}

export default userReducer