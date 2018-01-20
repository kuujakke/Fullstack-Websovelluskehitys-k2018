import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0,
            pisteet: 0,
            arvostelut: 0,
            anecdote: props.anecdotes[0]
        }
    }

    klikNappi = (props) => {
        return () => {
            this.setState({
                [props]: this.state[props] + 1
            })
        }
    }

    randomSelect = props => {
        return (
            props[Math.floor(Math.random() * props.length)]
        )
    }

    klikNext = (props) => {
        let anecdote = this.randomSelect(props)
        while (anecdote === this.state.anecdote) {
            anecdote = this.randomSelect(props)
        }
        return () => {
            this.setState({
                anecdote: anecdote
            })
        }
    }

    keskiarvo = () => {
        let yhteensa = this.state.hyva - this.state.huono
        let keskiarvo = yhteensa / (this.state.huono + this.state.hyva + this.state.neutraali)
        if (!isFinite(keskiarvo)) {
            keskiarvo = 0
        }
        return keskiarvo.toFixed(1)
    }

    positiivisia = () => {
        let yhteensa = this.state.neutraali + this.state.huono + this.state.hyva
        let positiivisia = (this.state.hyva * 100) / yhteensa
        if (!isFinite(positiivisia)) {
            positiivisia = 0
        }
        return positiivisia.toFixed(1)
    }

    arvostelut = () => {
        return ({
            hyva: this.state.hyva,
            neutraali: this.state.neutraali,
            huono: this.state.huono
        })
    }

    render() {
        return (
            <div>
                <h1>Anna palautetta</h1>
                <Button klikHandler={this.klikNappi} text={"Hyvä"} kentta={"hyva"}/>
                <Button klikHandler={this.klikNappi} text={"Neutraali"} kentta={"neutraali"} />
                <Button klikHandler={this.klikNappi} text={"Huono"} kentta={"huono"} />
                <h1>Statistiikka</h1>
                <Statistics arvostelut={this.arvostelut()}
                            keskiarvo={this.keskiarvo()}
                            positiivisia={this.positiivisia()}/>
                <Anecdote anecdotes={this.props.anecdotes} klikNext={this.klikNext} anecdote={this.state.anecdote}/>
            </div>
        )
    }
}

const Button = (props) => {
    return (
        <button onClick={props.klikHandler(props.kentta)}>
            {props.text}
        </button>
    )
}

const Statistics = (props) => {
    if (props.arvostelut.hyva > 0 || props.arvostelut.neutraali > 0 || props.arvostelut.huono > 0) {
        return (
            <table>
                <tbody>
                    <Statistic text={"Hyvä"} val={props.arvostelut.hyva} />
                    <Statistic text={"Neutraali"} val={props.arvostelut.neutraali} />
                    <Statistic text={"Huono"} val={props.arvostelut.huono} />
                    <Statistic text={"Keskiarvo"} val={props.keskiarvo} />
                    <Statistic text={"Positiivisia"} val={props.positiivisia} sign={"%"}/>
                </tbody>
            </table>
        )
    }
    return (
        <p>Ei yhtään palautetta annettu.</p>
    )
}

const Statistic = (props) => {
    return (
        <tr>
            <td>{props.text}</td>
            <td>{props.val} {props.sign}</td>
        </tr>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Anecdote = (props) => {
    return (
        <div>
            <h2>{props.anecdote}</h2>
            <button onClick={props.klikNext(props.anecdotes)}>Next anecdote</button>
        </div>
    )
}

ReactDOM.render(
    <App anecdotes={anecdotes}/>,
    document.getElementById('root')
)
