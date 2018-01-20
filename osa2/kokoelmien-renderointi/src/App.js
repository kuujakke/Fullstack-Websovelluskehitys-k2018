import React from 'react'
import Kurssi from './components/Kurssi'

const App = () => {
    const kurssi = {
        id: 0,
        otsikko: {
            id: 0,
            text: 'Half Stack -sovelluskehitys'
        },
        osat: [
            {
                id: 0,
                nimi: 'Reactin perusteet',
                tehtavia: 10
            },
            {
                id: 1,
                nimi: 'Tiedonvälitys propseilla',
                tehtavia: 7
            },
            {
                id: 2,
                nimi: 'Komponenttien tila',
                tehtavia: 14
            },
            {
                id: 3,
                nimi: 'Tehtävien määrä',
                tehtavia: 19
            }
        ]
    }
    return (
        <Kurssi key={kurssi.id} kurssi={kurssi}/>
    )
}


export default App