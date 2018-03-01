import React from 'react'
import { connect } from 'react-redux'
import { anecdoteCreate } from '../reducers/anecdoteReducer'
import { setMessage, resetMessage } from '../reducers/notificationReducer'

class AnecdoteForm extends React.Component {
    handleSubmit = async (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        e.target.anecdote.value = ''
        this.props.anecdoteCreate(content)
        this.props.setMessage(`Created anecdote: '${content}'`)
        setTimeout(() => {
            this.props.resetMessage()
        }, 5000)
    }

    render () {
        return (
            <div>
                <h2>create new</h2>
                <form onSubmit={this.handleSubmit}>
                    <div><input name='anecdote'/></div>
                    <button>create</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state
}

const mapDispatchToProps = {
    anecdoteCreate, setMessage, resetMessage
}

const ConnectedAnecdoteForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm
