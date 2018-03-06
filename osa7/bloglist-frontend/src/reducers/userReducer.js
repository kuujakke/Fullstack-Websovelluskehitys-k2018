import userService from '../services/users'

const userReducer = (store = [], action) => {
    switch (action.type) {
        case 'INIT':
            return [...action.data]
        default:
            return store
    }
}

export const initializeUsers = () => {
    return async (dispatch) => {
        const users = await userService.getAll()
        dispatch({type: 'INIT', data: users})
    }
}

export default userReducer