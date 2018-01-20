import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [
                { name: 'Arto Hellas' }
            ],
            newName: ''
        }
    }

    addNumber = (event) => {
        event.preventDefault()
        const person = {
            name: this.state.newName
        }
        const persons = this.state.persons.concat(person)
        this.setState({
            persons,
            newNote: ''
        })
    }

    handleChange = (event) => {
        event.preventDefault()
        this.setState({ newName: event.target.value })
    }

    render() {
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <form onSubmit={this.addNumber}>
                    <div>nimi:
                        <input
                        value={this.state.newName}
                        onChange={this.handleChange}
                        />
                    </div>
                    <button type="submit">lisää</button>
                </form>
                <h2>Numerot</h2>
                ...
            </div>
        )
    }
}

export default App