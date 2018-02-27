import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import counterReducer from './reducer'

const store = createStore(counterReducer)

const numberOfReviews = () => {
    return Object.values(store.getState()).
        reduce((acc, cur) => acc + cur)
}

const average = () => {
    const state = store.getState()
    const sum = state.good - state.bad
    const reviews = numberOfReviews()
    return (sum / reviews).toFixed(1)
}

const positiveness = () => {
    const state = store.getState()
    const reviews = numberOfReviews()
    const positive = (state.good * 100) / reviews
    return positive.toFixed(1)
}

const Statistiikka = () => {
    const palautteita = numberOfReviews()
    if (palautteita === 0) {
        return (
            <div>
                <h2>statistiikka</h2>
                <div>ei yhtään palautetta annettu</div>
            </div>
        )
    }

    return (
        <div>
            <h2>statistiikka</h2>
            <table>
                <tbody>
                <tr>
                    <td>hyvä</td>
                    <td>{store.getState().good}</td>
                </tr>
                <tr>
                    <td>neutraali</td>
                    <td>{store.getState().ok}</td>
                </tr>
                <tr>
                    <td>huono</td>
                    <td>{store.getState().bad}</td>
                </tr>
                <tr>
                    <td>keskiarvo</td>
                    <td>{average()}</td>
                </tr>
                <tr>
                    <td>positiivisia</td>
                    <td>{positiveness()}</td>
                </tr>
                </tbody>
            </table>

            <button onClick={() => store.dispatch({type: 'ZERO'})}>
                nollaa tilasto
            </button>
        </div>
    )
}

class App extends React.Component {
    klik = (nappi) => () => {
        store.dispatch({type: nappi})
    }

    render () {
        return (
            <div>
                <h2>anna palautetta</h2>
                <button onClick={this.klik('GOOD')}>hyvä</button>
                <button onClick={this.klik('OK')}>neutraali</button>
                <button onClick={this.klik('BAD')}>huono</button>
                <Statistiikka/>
            </div>
        )
    }
}

export default App

const render = () => {
    ReactDOM.render(<App/>, document.getElementById('root'))
}

render()
store.subscribe(render)