import React from 'react'

const Search = ({search, searchHandler}) => {
    return (
        <form className="kentta">
            Rajaa näytettäviä:
            <input
                value={search}
                onChange={searchHandler}
            />
        </form>
    )
}

export default Search