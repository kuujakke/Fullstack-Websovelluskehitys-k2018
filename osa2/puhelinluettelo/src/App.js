import React from 'react';
import personService from './services/persons';
import Content from "./components/Content";
import AddPerson from "./components/AddPerson";
import Search from "./components/Search";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            newPerson: {
                name: '',
                number: ''
            },
            search: '',
            searchResults: []
        }
    }

    newPerson = (event) => {
        const newPerson = {
            id: this.state.persons.length + 1,
            ...this.state.newPerson
        }

        personService
            .create(newPerson)
            .then(newPerson => {
                this.setState({
                    persons: this.state.persons.concat(newPerson),
                    newPerson: {
                        name: '',
                        number: ''
                    },
                    search: '',
                    searchResults: this.state.persons.concat(newPerson)
                })
            })
    }

    handleChange = (event) => {
        event.preventDefault()
        event.stopPropagation()
        let newPerson = this.state.newPerson
        newPerson[event.target.title] = event.target.value
        this.setState(newPerson)
    }

    handleSearch = (event) => {
        event.preventDefault()
        event.stopPropagation()
        let search = event.target.value
        let searchResults = search.length > 0 ?
            this.searchPerson(search) :
            this.state.persons
        this.setState({
            searchResults,
            search: event.target.value
        })
    }

    searchPerson = (search) => {
        return this.state.persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
    }

    componentWillMount() {
        personService
            .getAll()
            .then(persons => {
                this.setState({
                    persons: persons
                })
            })
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
                <AddPerson
                    addHandler={this.newPerson}
                    changeHandler={this.handleChange}
                    newPerson={this.state.newPerson}
                />
                <h2>Numerot</h2>
                <Content persons={this.state.searchResults}/>
            </div>
        )
    }
}

export default App