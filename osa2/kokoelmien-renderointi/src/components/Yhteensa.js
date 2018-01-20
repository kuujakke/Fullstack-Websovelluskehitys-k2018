import React from 'react'

const Yhteensa = ({osat}) => {
    const yhteensa = osat.map(
        (osa) => osa.tehtavia
    ).reduce(
        (yht, tehtavia) => yht + tehtavia
    )
    return (
        <p key={yhteensa.toString()}>Yhteensä {yhteensa} tehtävää</p>
    )
}

export default Yhteensa