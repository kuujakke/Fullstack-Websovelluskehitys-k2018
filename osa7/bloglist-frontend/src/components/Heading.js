import React from 'react'
import Navigation from './Navigation'
import Notification from './Notification'

const Heading = ({title, history}) => {
    return (
        <div>
            <h1>{title}</h1>
            <Navigation history={history}/>
            <Notification/>
        </div>
    )
}

export default Heading