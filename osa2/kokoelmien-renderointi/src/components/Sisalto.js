import React from 'react'
import Osa from '../components/Osa'

const Sisalto = ({osat}) => {
    const rivit = osat.map((osa) =>
        <Osa key={osa.id} nimi={osa.nimi} tehtavia={osa.tehtavia} />
    )
    return (
        <table>
            <tbody>
                {rivit}
            </tbody>
        </table>
    )
}

export default Sisalto