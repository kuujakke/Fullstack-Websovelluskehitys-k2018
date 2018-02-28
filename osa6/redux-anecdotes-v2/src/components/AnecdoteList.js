import React from 'react'
import { connect } from 'react-redux'
import { anecdoteVote } from '../reducers/anecdoteReducer'
import { setMessage, resetMessage } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {

    voteHandler = (anecdote) => () => {
        this.props.anecdoteVote(anecdote.id)
        this.props.setMessage(`You voted for '${anecdote.content}'`)
        setTimeout(() => {
            this.props.resetMessage()
        }, 5000)
    }

    render () {
        return (
            <div>
                <h2>Anecdotes</h2>
                {this.props.anecdotes
                    .filter(a => a.content.includes(this.props.filter))
                    .sort((a, b) => b.votes - a.votes)
                    .map(anecdote =>
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

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        filter: state.filter,
    }
}

const mapDispatchToProps = {
    anecdoteVote, setMessage, resetMessage,
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(
    AnecdoteList)

export default ConnectedAnecdoteList
