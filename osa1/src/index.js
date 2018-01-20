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
            selected: 0,
            anecdotes: props.anecdotes
        }
    }

    klikNappi = (props) => {
        return () => {
            this.setState({
                [props]: this.state[props] + 1
            })
        }
    }

    randomSelect = (props) => {
        return (Math.floor(Math.random() * props))
    }

    klikNext = (props) => {
        let selected = this.randomSelect(props)
        while (selected === this.state.selected) {
            selected = this.randomSelect(props)
        }
        return () => {
            this.setState({
                selected: selected
            })
        }
    }

    voteAnecdote = (props) => {
        return () => {
            let anecdotes = this.state.anecdotes
            anecdotes[props].votes++
            this.setState({
                anecdotes: anecdotes
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
        let anecdote = this.state.anecdotes[this.state.selected]
        return (
            <div>
                <h1>Anna palautetta</h1>
                <Button klikHandler={this.klikNappi} text={"Hyvä"} kentta={"hyva"}/>
                <Button klikHandler={this.klikNappi} text={"Neutraali"} kentta={"neutraali"} />
                <Button klikHandler={this.klikNappi} text={"Huono"} kentta={"huono"} />
                <h1>Statistiikka</h1>
                <Statistics arvostelut={this.arvostelut()}
                            keskiarvo={this.keskiarvo()}
                            positiivisia={this.positiivisia()} />
                <Anecdote text={anecdote.text}
                          votes={anecdote.votes} />
                <Button klikHandler={this.voteAnecdote} text={"Vote"} kentta={this.state.selected} />
                <Button klikHandler={this.klikNext} text={"Next anecdote"} kentta={this.state.anecdotes.length} />
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
    { text: 'If it hurts, do it more often', votes: 0 },
    { text: 'Adding manpower to a late software project makes it later!', votes: 0 },
    { text: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', votes: 0 },
    { text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', votes: 0 },
    { text: 'Premature optimization is the root of all evil.', votes: 0 },
    { text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', votes: 0 }
]

const Anecdote = (props) => {
    return (
        <div>
            <h1>Anekdootit</h1>
            <blockquote>- {props.text}</blockquote>
            <div>Has {props.votes} votes.</div>
        </div>
    )
}

ReactDOM.render(
    <App anecdotes={anecdotes}/>,
    document.getElementById('root')
)
