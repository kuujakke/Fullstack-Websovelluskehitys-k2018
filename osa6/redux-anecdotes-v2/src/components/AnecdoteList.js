import React from 'react'
import { anecdoteVote } from '../reducers/anecdoteReducer'
import { setMessage, resetMessage } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {

    voteHandler = (anecdote) => () => {
        this.props.store.dispatch(anecdoteVote(anecdote.id))
        this.props.store.dispatch(setMessage(`You voted for '${anecdote.content}'`))
        setTimeout(() => {
            this.props.store.dispatch(resetMessage())
        }, 5000)
    }

    render () {
        const anecdotes = this.props.store.getState().anecdotes
        return (
            <div>
                <h2>Anecdotes</h2>
                {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={this.voteHandler(anecdote)}>
                                vote
                            </button>
                        </div>
                    </div>,
                )}
            </div>
        )
    }
}

export default AnecdoteList
