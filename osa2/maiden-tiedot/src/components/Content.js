import React from 'react'

const Content = ({results}) => {
    return results.length === 1 ?
        <ShowCountry country={results[0]} /> :
        <ListCountries countries={results} />
}

const ShowCountry = ({country}) => {
    console.log(country)
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

const ListCountries = ({countries}) => {
    return (
        <div>
            <ul>
                {countries.length <= 10 ?
                    countries.map(c => <ListItem id={c.id} content={c.name}/>) :
                    <li>Too many results.</li>
                }
            </ul>
        </div>
    )
}

const ListItem = ({id, content}) => {
    return <li key={id}>{content}</li>
}

export default Content