import React from 'react'

const Search = ({search, handler}) => {
    return (
        <form>
            Rajaa näytettäviä:
            <input
                value={search}
                title={"search"}
                onChange={handler}
            />
        </form>
    )
}

export default Search