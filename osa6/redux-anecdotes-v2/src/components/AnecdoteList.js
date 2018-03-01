import React from 'react'
import { connect } from 'react-redux'
import { anecdoteVote } from '../reducers/anecdoteReducer'
import { setMessage, resetMessage } from '../reducers/notificationReducer'
import Filter from './Filter'

const AnecdoteList = (props) => {

    const voteHandler = (anecdote) => async () => {
        props.anecdoteVote(anecdote.id)
        props.setMessage(`You voted for '${anecdote.content}'`)
        setTimeout(() => {
            props.resetMessage()
        }, 5000)
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            <Filter/>
            {props.anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={voteHandler(anecdote)}>
                            vote
                        </button>
                    </div>
                </div>,
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes
        .filter(a => a.content.includes(state.filter))
        .sort((a, b) => b.votes - a.votes),
    }
}

const mapDispatchToProps = {
    anecdoteVote, setMessage, resetMessage,
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(
    AnecdoteList)

export default ConnectedAnecdoteList
