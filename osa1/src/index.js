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
            arvostelut: 0
        }
    }

    klikHyva = () => {
        this.setState({
            hyva: this.state.hyva + 1,
        })
    }

    klikNeutraali = () => {
        this.setState({
            neutraali: this.state.neutraali + 1,
        })
    }

    klikHuono = () => {
        this.setState({
            huono: this.state.huono + 1,
        })
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
                <Button klikHandler={this.klikHyva} text={"Hyvä"} />
                <Button klikHandler={this.klikNeutraali} text={"Neutraali"} />
                <Button klikHandler={this.klikHuono} text={"Huono"} />
                <h1>Statistiikka</h1>
                <div>
                    <Statistics arvostelut={this.arvostelut()} keskiarvo={this.keskiarvo()} positiivisia={this.positiivisia()}/>
                </div>
            </div>
        )
    }
}

const Button = (props) => {
    return (
        <button onClick={props.klikHandler}>
            {props.text}
        </button>
    )
}

const Statistics = (props) => {
    if (props.arvostelut.hyva > 0 || props.arvostelut.neutraali > 0 || props.arvostelut.huono > 0) {
        return (
            <div>
                <Statistic text={"Hyvä"} val={props.arvostelut.hyva} />
                <Statistic text={"Neutraali"} val={props.arvostelut.neutraali} />
                <Statistic text={"Huono"} val={props.arvostelut.huono} />
                <Statistic text={"Keskiarvo"} val={props.keskiarvo} />
                <Statistic text={"Positiivisia"} val={props.positiivisia} sign={"%"}/>
            </div>
        )
    }
    return (
        <p>Ei yhtään palautetta annettu.</p>
    )
}

const Statistic = (props) => {
    return (
        <p>{props.text} {props.val} {props.sign}</p>
    )
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
)
