import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'
import navigationReducer from './reducers/navigationReducer'

const reducer = combineReducers({
    notification: notificationReducer,
    users: userReducer,
    blogs: blogReducer,
    login: loginReducer,
    navigation: navigationReducer,
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store