import React, {Component} from 'react';
import axios from 'axios';
import Content from '../components/Content'
import FindCountries from '../components/FindCountries'

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            countries: [],
            results: [],
            search: ''
        }
    }

    componentWillMount() {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                this.setState({
                    countries: response.data
                })
            })
    }

    handler = (event) => {
        event.preventDefault()
        event.stopPropagation()
        let results = this.state.countries.filter(c => c.name.toLowerCase().includes(event.target.value.toLowerCase()))
        this.setState({
            search: event.target.value,
            results: results
        })
    }

    klikHandler = (event) => {
        event.preventDefault()
        event.stopPropagation()
        let search = event.target.textContent
        this.setState({
            search: search,
            results: [this.state.countries.find(c => c.name.toLowerCase().includes(search.toLowerCase()))]
        })
    }

    render() {
        return (
            <div className="App">
                <FindCountries handler={this.handler}/>
                <Content results={this.state.results} handler={this.klikHandler}/>
            </div>
        );
    }
}

export default App;
