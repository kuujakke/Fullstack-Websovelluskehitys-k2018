import { createStore, combineReducers } from 'redux'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'

const store = createStore(combineReducers(
    {anecdotes: anecdoteReducer, notification: notificationReducer}))

export default store