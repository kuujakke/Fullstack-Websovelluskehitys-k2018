import React from 'react'

const Content = ({persons, deleteHandler}) => {
    return (
        <h2>Numerot</h2>,
        <table>
            <tbody><Persons persons={persons} deleteHandler={deleteHandler} /></tbody>
        </table>
    )
}

const Persons = ({persons, deleteHandler}) => {
    return  persons.length > 0 ?
        persons.map(p => <Person key={p.id} id={p.id} name={p.name} number={p.number} deleteHandler={deleteHandler} />) :
        <tr><td>Ei numeroita</td></tr>
}

const Person = ({id, name, number, deleteHandler}) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{number}</td>
            <td><button onClick={deleteHandler(id)} value={id}>Poista</button></td>
        </tr>
    )
}

export default Content