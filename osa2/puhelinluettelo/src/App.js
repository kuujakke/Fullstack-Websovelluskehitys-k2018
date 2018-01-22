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
        event.preventDefault()
        const person = this.state.persons.find(p => p.name === this.state.newPerson.name)
        person !== undefined ?
            window.confirm(`${person.name} on jo luettelossa, korvataanko vanha numero uudella?`) ?
                person.number = this.state.newPerson.number :
                console.log("No person found")
            : undefined
        const newPerson = {
            id: this.state.persons.length + 1,
            ...this.state.newPerson
        }
        person === undefined ?
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
                }) :
            personService
                .update(person.id, person)
                .then(newPerson => {
                    this.setState({
                        newPerson: {
                            name: '',
                            number: ''
                        },
                        search: '',
                        persons: this.state.persons.filter(p => p.id !== newPerson.id).concat(person),
                        searchResults: this.state.persons.filter(p => p.id !== newPerson.id).concat(person)
                    })
                })
    }

    deletePerson = () => {
        return (event) => {
            let person = this.state.persons.find((p) => p.id === parseInt(event.target.value, 10))
            window.confirm(`Poistetaanko ${person.name}`) ?
                personService
                    .destroy(person.id)
                    .then(this.setState({
                        persons: this.state.persons.filter((p) => p.id !== person.id),
                        searchResults: this.state.persons.filter((p) => p.id !== person.id)
                    }))
                    .catch(error => {
                        console.log(`Failed to delete person with id ${person.id} with error: ${error}`)
                    }) :
                console.log("Delete canceled")
        }
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
                    persons: persons,
                    searchResults: persons
                })
            })
    }

    render() {
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <Search
                    search={this.state.search}
                    searchHandler={this.handleSearch}
                />
                <h2>Lisää uusi</h2>
                <AddPerson
                    addHandler={this.newPerson}
                    changeHandler={this.handleChange}
                    newPerson={this.state.newPerson}
                />
                <h2>Numerot</h2>
                <Content persons={this.state.searchResults} deleteHandler={this.deletePerson}/>
            </div>
        )
    }
}

export default App