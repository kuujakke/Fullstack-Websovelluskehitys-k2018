import React from 'react'
import Filter from './components/Filter'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

class App extends React.Component {

    render () {
        return (
            <div>
                <h1>Programming anecdotes</h1>
                <Filter />
                <Notification />
                <AnecdoteList />
                <AnecdoteForm />
            </div>
        )
    }

    componentDidMount () {
        setTimeout(() => {
           // this.props.store.dispatch(resetMessage(null))
        }, 5000)
    }
}

export default App