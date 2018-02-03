import React from 'react';
import personService from './services/persons';
import Content from "./components/Content";
import AddPerson from "./components/AddPerson";
import Search from "./components/Search";
import Notification from "./components/Notification";

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
            searchResults: [],
            message: null,
            type: null
        }
    }

    newPerson = (event) => {
        event.preventDefault()
        const person = this.state.persons.find(p => p.name === this.state.newPerson.name)
        if (person !== undefined) {
            if (window.confirm(`${person.name} on jo luettelossa, korvataanko vanha numero uudella?`)) {
                person.number = this.state.newPerson.number
            } else {
                return null
            }
        }
        person === undefined ?
            personService
                .create(this.state.newPerson)
                .then(person => {
                    this.setState({
                        persons: this.state.persons.concat(person),
                        newPerson: {
                            name: '',
                            number: ''
                        },
                        search: '',
                        searchResults: this.state.persons.concat(person)
                    })
                    this.flashMessage(`Henkilön ${person.name} lisääminen luetteloon onnistui.`, 'success')
                })
                .catch(error => {
                    this.flashMessage(`Henkilön ${person.name} lisääminen luetteloon epäonnistui.`, 'error')
                    console.log(`Virhe: ${error}`)
                }) :
            personService
                .update(person.id, person)
                .then(updatedPerson => {
                    console.log(updatedPerson)
                    this.setState({
                        newPerson: {
                            name: '',
                            number: ''
                        },
                        search: '',
                        persons: this.state.persons.filter(p => p.id !== person.id).concat(updatedPerson),
                        searchResults: this.state.persons.filter(p => p.id !== person.id).concat(updatedPerson)
                    })
                    this.flashMessage(`Henkilön ${person.name} tietojen päivittäminen onnistui.`, 'success')
                })
                .catch(error => {
                    this.flashMessage(`Henkilön ${person.name} tietojen päivittäminen epäonnistui.`, 'error')
                    console.log(`Virhe: ${error}`)
                })
    }

    deletePerson = () => {
        return (event) => {
            let person = this.state.persons.find((p) => p.id === event.target.value)
            person !== undefined ?
                window.confirm(`Poistetaanko ${person.name}`) ?
                    personService
                        .destroy(person.id)
                        .then(() => {
                            this.setState({
                                persons: this.state.persons.filter(p => p.id !== person.id),
                                searchResults: this.state.persons.filter(p => p.id !== person.id)
                            })
                            console.log(this.state.persons)
                            this.flashMessage(`Henkilön ${person.name} poistaminen onnistui.`, 'success')
                        })
                        .catch(error => {
                            this.flashMessage(`Henkilön ${person.name} poistaminen epäonnistui.`, 'error')
                            console.log(`Failed to delete person with id ${person.id} with error: ${error}`)
                        }) :
                    console.log("Delete canceled") :
                console.log("Person is undefined.")
        }
    }

    flashMessage = (message, type) => {
        this.setState({ message, type })
        setTimeout(() => {
            this.setState({message: null, type: null})
        }, 5000)
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
            .catch(error => {
                this.flashMessage(`Virhe tapahtui ladatessa henkilötietoja.`, 'error')
                console.log(error)
            })
    }

    render() {
        return (
            <div>
                <h1>Puhelinluettelo</h1>
                <Notification message={this.state.message} type={this.state.type} />
                <Search
                    search={this.state.search}
                    searchHandler={this.handleSearch}
                />
                <AddPerson
                    addHandler={this.newPerson}
                    changeHandler={this.handleChange}
                    newPerson={this.state.newPerson}
                />
                <Content persons={this.state.searchResults} deleteHandler={this.deletePerson}/>
            </div>
        )
    }
}

export default App