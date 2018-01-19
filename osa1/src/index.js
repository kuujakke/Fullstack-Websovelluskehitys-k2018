import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    const kurssi = {
        nimi: 'Half Stack -sovelluskehitys',
        osat: [
            {
                nimi: 'Reactin perusteet',
                tehtavia: 10
            },
            {
                nimi: 'Tiedonvälitys propseilla',
                tehtavia: 7
            },
            {
                nimi: 'Komponenttien tila',
                tehtavia: 14
            }
        ]
    }
    return (
        [
            <Otsikko nimi={kurssi.nimi}/>,
            <Sisalto osat={kurssi.osat}/>,
            <Yhteensa osat={kurssi.osat}/>
        ]
    )
}

const Otsikko = (props) => {
    return (
        <h1>{props.nimi}</h1>
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
