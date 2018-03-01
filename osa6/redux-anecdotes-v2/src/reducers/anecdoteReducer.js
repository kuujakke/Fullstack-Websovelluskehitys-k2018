const anecdoteReducer = (store = [], action) => {
    switch (action.type) {
        case 'VOTE':
            const old = store.filter(a => a.id !== action.id)
            const voted = store.find(a => a.id === action.id)

            return [...old, {...voted, votes: voted.votes + 1}]
        case 'CREATE':
            return [
                ...store,
                {
                    content: action.content,
                    votes: 0,
                    id: action.id,
                }]
        case 'INIT':
            return action.data
        default:
            return store
    }
}

export const anecdoteCreate = (anecdote) => {
    return {type: 'CREATE', ...anecdote}
}

export const anecdoteVote = (id) => {
    return {type: 'VOTE', id}
}

export const anecdoteInitialize = (data) => {
    return {type: 'INIT', data}
}

export default anecdoteReducer