import React from 'react'

const FindCountries = ({handler}) => {
    return (
        <div>
            <form>
                Find Countries:
                <input
                    onChange={handler}
                />
            </form>
        </div>
    )
}

export default FindCountries