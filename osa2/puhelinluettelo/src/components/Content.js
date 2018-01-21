import React from 'react'

const Content = ({persons}) => {
    return (
        <table>
            <tbody><Persons persons={persons} /></tbody>
        </table>
    )
}

const Persons = ({persons}) => {
    return  persons.length > 0 ?
        persons.map(p => <Person key={p.id} name={p.name} number={p.number} />) :
        <tr><td>Ei numeroita</td></tr>
}

const Person = ({name, number}) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{number}</td>
        </tr>
    )
}

export default Content