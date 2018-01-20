import React from 'react'

const Yhteensa = ({osat}) => {
    let yhteensa = 0
    osat.map(osa => yhteensa += osa.tehtavia)
    return (
        <p key={yhteensa.toString()}>Yhteensä {yhteensa} tehtävää</p>
    )
}

export default Yhteensa