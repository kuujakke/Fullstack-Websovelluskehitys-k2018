import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'

const reducer = combineReducers({
    notification: notificationReducer,
    users: userReducer,
    blogs: blogReducer,
    login: loginReducer,
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store