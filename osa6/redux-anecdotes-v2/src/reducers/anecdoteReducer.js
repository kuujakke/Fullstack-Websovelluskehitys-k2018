import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (store = [], action) => {
    switch (action.type) {
        case 'VOTE':
            const old = store.filter(a => a.id !== action.id)
            const voted = store.find(a => a.id === action.id)

            return [...old, {...voted, votes: voted.votes + 1}]
        case 'CREATE':
            return [...store, {content: action.content, votes: 0,}]
        case 'INIT':
            return action.data
        default:
            return store
    }
}

export const anecdoteCreate = (content) => {
    return async (dispatch) => {
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch({type: 'CREATE', ...newAnecdote})
    }
}

export const anecdoteVote = (id) => {
    return async (dispatch) => {
        const anecdotes = await anecdoteService.getAll()
        const anecdote = anecdotes.find(a => a.id === id)
        await anecdoteService.putAnecdote(
            {...anecdote, votes: anecdote.votes + 1})
        dispatch({type: 'VOTE', id: anecdote.id})
    }
}

export const anecdoteInitialize = () => {
    return async (dispatch) => {
        const anecdotes = await anecdoteService.getAll()
        dispatch({type: 'INIT', data: anecdotes})
    }
}

export default anecdoteReducer