import React from 'react'

const Osa = ({nimi, tehtavia}) => {
    return (
        <tr>
            <td>{nimi}</td>
            <td>{tehtavia}</td>
        </tr>
    )
}

export default Osa