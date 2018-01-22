import React from 'react'

const Search = ({search, searchHandler}) => {
    return (
        <form>
            Rajaa näytettäviä:
            <input
                value={search}
                onChange={searchHandler}
            />
        </form>
    )
}

export default Search