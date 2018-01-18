import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    const kurssi = 'Half Stack -sovelluskehitys'
    const osa1 = 'Reactin perusteet'
    const tehtavia1 = 10
    const osa2 = 'Tiedonvälitys propseilla'
    const tehtavia2 = 7
    const osa3 = 'Komponenttien tila'
    const tehtavia3 = 14

    return (
        [
            <Otsikko kurssi={kurssi}/>,
            <Sisalto tehtavia1={tehtavia1} tehtavia2={tehtavia2} tehtavia3={tehtavia3} osa1={osa1} osa2={osa2}
                     osa3={osa3}/>,
            <Yhteensa tehtavia1={tehtavia1} tehtavia2={tehtavia2} tehtavia3={tehtavia3}/>
        ]
    )
}

const Otsikko = (props) => {
    return (
        <h1>{props.kurssi}</h1>
    )
}

const Sisalto = (props) => {
    return (
        [
            <Osa osa={props.osa1} tehtavia={props.tehtavia1}/>,
            <Osa osa={props.osa2} tehtavia={props.tehtavia2}/>,
            <Osa osa={props.osa3} tehtavia={props.tehtavia3}/>
        ]

    )
}

const Yhteensa = (props) => {
    return (
        <p>yhteensä {props.tehtavia1 + props.tehtavia2 + props.tehtavia3} tehtävää</p>
    )
}

const Osa = (props) => {
    return (
        <p>{props.osa} {props.tehtavia}</p>
    )
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
)
