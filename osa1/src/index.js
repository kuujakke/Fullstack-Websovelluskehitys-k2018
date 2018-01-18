import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    const kurssi = 'Half Stack -sovelluskehitys'
    const osa1 = {
        nimi: 'Reactin perusteet',
        tehtavia: 10
    }
    const osa2 = {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7
    }
    const osa3 = {
        nimi: 'Komponenttien tila',
        tehtavia: 14
    }
    let osat = [osa1, osa2, osa3]
    return (
        [
            <Otsikko kurssi={kurssi}/>,
            <Sisalto osat={osat}/>,
            <Yhteensa osat={osat}/>
        ]
    )
}

const Otsikko = (props) => {
    return (
        <h1>{props.kurssi}</h1>
    )
}

const Sisalto = (props) => {
    let komponentit = []
    props.osat.forEach(function (osa) {
        komponentit.push(Osa(osa))
    })
    return (komponentit)
}

const Yhteensa = (props) => {
    let yhteensa = 0
    props.osat.forEach(function (osa) {
        yhteensa += osa.tehtavia
    })
    return (
        <p>yhteensä {yhteensa} tehtävää</p>
    )
}

const Osa = (props) => {
    return (
        <p>{props.nimi} {props.tehtavia}</p>
    )
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
)
