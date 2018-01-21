import React from 'react'

const Content = ({results, handler}) => {
    return results.length === 1 ?
        <ShowCountry country={results[0]} /> :
        <ListCountries countries={results} handler={handler} />
}

const ShowCountry = ({country}) => {
    return (
        <div>
            <h1>{country.name}</h1>
            <table>
                <tbody>
                <tr>
                    <td>Capital</td>
                    <td>{country.capital}</td>
                </tr>
                <tr>
                    <td>Population</td>
                    <td>{country.population}</td>
                </tr>
                </tbody>
            </table>
            <img src={country.flag} alt={country.name} width="500px"/>
        </div>
    )
}

const ListCountries = ({countries, handler}) => {
    return (
        <div>
            <ul>
                {countries.length <= 10 ?
                    countries.map(c => <ListItem key={c.alpha3Code} content={c.name} handler={handler} />) :
                    <li>Too many results.</li>
                }
            </ul>
        </div>
    )
}

const ListItem = ({content, handler}) => {
    return <li onClick={handler}>{content}</li>
}

export default Content