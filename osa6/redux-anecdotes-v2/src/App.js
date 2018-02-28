import React from 'react'
import Filter from './components/Filter'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import { resetMessage } from './reducers/notificationReducer'

class App extends React.Component {

    render () {
        //const anecdotes = this.props.store.getState()
        return (
            <div>
                <h1>Programming anecdotes</h1>
                <Filter store={this.props.store}/>
                <Notification store={this.props.store}/>
                <AnecdoteList store={this.props.store}/>
                <AnecdoteForm store={this.props.store}/>
            </div>
        )
    }

    componentDidMount () {
        setTimeout(() => {
            this.props.store.dispatch(resetMessage(null))
        }, 5000)
    }
}

export default App