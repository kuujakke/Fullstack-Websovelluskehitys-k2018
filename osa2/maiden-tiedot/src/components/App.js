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
        let results = this.state.countries.filter(c => c.name.includes(event.target.value))
        this.setState({
            search: event.target.value,
            results: results
        })
    }

    render() {
        return (
            <div className="App">
                <FindCountries handler={this.handler}/>
                <Content results={this.state.results}/>
            </div>
        );
    }
}

export default App;
