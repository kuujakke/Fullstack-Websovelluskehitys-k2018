import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [
                {
                    id: 0,
                    name: 'Arto Hellas',
                    number: '0700-123123'
                }
            ],
            newName: '',
            newNumber: ''
        }
    }

    addNumber = (event) => {
        event.preventDefault()
        event.stopPropagation()
        const person = {
            id: this.state.persons.length,
            name: this.state.newName,
            number: this.state.newNumber
        }

        const persons =
            this.state.persons.find(p => p.name === this.state.newName | this.state.newName === '') ?
            this.state.persons :
            this.state.persons.concat(person)

        this.setState({
            persons,
            newName: '',
            newNumber: ''
        })
    }

    handleChange = (event) => {
        event.preventDefault()
        this.setState({ [event.target.title]: event.target.value })
    }

    render() {
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <form onSubmit={this.addNumber}>
                    <div>nimi:
                        <input
                        value={this.state.newName}
                        title={"newName"}
                        onChange={this.handleChange}
                        />
                    </div>
                    <div>numero:
                        <input
                        value={this.state.newNumber}
                        title={"newNumber"}
                        onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <button type="submit">lisää</button>
                    </div>
                </form>
                <h2>Numerot</h2>
                <table>
                    <tbody><Persons persons={this.state.persons} /></tbody>
                </table>
            </div>
        )
    }
}

const Persons = ({persons}) => {
    return  persons.length > 0 ?
            persons.map(p => <Person key={p.id} name={p.name} number={p.number} />) :
            <tr><td>Ei vielä numeroita</td></tr>
}

const Person = ({name, number}) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{number}</td>
        </tr>
    )
}

export default App