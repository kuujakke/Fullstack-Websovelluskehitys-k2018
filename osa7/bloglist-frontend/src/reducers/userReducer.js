import userService from '../services/users'

const userReducer = (users = [], action) => {
    switch (action.type) {
        case 'INIT':
            return action.data
        default:
            return users
    }
}

export const initializeUsers = () => {
    return async (dispatch) => {
        const users = await userService.getAll()
        dispatch({type: 'INIT', data: users})
    }
}

export default userReducer