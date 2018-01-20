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

    render() {
        return (
            <div>
                <div>
                    <h1>Anna palautetta</h1>
                    <button onClick={this.klikHyva}>Hyvä</button>
                    <button onClick={this.klikNeutraali}>Neutraali</button>
                    <button onClick={this.klikHuono}>Huono</button>
                </div>
                <div>
                    <h1>Statistiikka</h1>
                    <p>Hyvä {this.state.hyva}</p>
                    <p>Neutraali {this.state.neutraali}</p>
                    <p>Huono {this.state.huono}</p>
                    <p>Keskiarvo {this.keskiarvo()}</p>
                    <p>Positiivisia {this.positiivisia()} %</p>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
)
