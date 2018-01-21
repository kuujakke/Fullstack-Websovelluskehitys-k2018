import React from 'react';
import Content from "./components/Content";
import AddNumber from "./components/AddNumber";
import Search from "./components/Search";

class App extends React.Component {
    constructor(props) {
        super(props)
        let persons = [
            { id: 0, name: 'Arto Hellas', number: '0700-123123' },
            { id: 1, name: 'Martti Tienari', number: '040-123456' },
            { id: 2, name: 'Arto Järvinen', number: '040-123456' },
            { id: 3, name: 'Lea Kutvonen', number: '040-123456' }
        ]
        this.state = {
            persons: persons,
            newName: '',
            newNumber: '',
            search: '',
            searchResults: persons
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
            newNumber: '',
            search: '',
            searchResults: persons
        })
    }

    handleChange = (event) => {
        event.preventDefault()
        event.stopPropagation()
        this.setState({ [event.target.title]: event.target.value })
    }

    handleSearch = (event) => {
        event.preventDefault()
        event.stopPropagation()
        let searchResults = this.searchResults(event.target.value)
        this.setState({
            searchResults,
            [event.target.title]: event.target.value
        })
    }

    searchResults = (props) => {
        let persons = this.state.persons
        return persons.find(p => p.name.toLowerCase().includes(props)) | props !== '' ?
            persons.filter(p => p.name.toLowerCase().includes(props)) :
            persons
    }

    render() {
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <Search
                    search={this.state.search}
                    handler={this.handleSearch}
                />
                <h2>Lisää uusi</h2>
                <AddNumber
                    addHandler={this.addNumber}
                    changeHandler={this.handleChange}
                    newName={this.state.newName}
                    newNumber={this.state.newNumber}
                />
                <h2>Numerot</h2>
                <Content persons={this.state.searchResults}/>
            </div>
        )
    }
}

export default App