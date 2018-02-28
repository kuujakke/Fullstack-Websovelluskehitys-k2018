import { createStore, combineReducers } from 'redux'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

const store = createStore(combineReducers(
    {
        anecdotes: anecdoteReducer,
        notification: notificationReducer,
        filter: filterReducer,
    }))

export default store