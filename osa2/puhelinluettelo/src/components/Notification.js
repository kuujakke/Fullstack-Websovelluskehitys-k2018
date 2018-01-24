import React from 'react'

const Notification = ({message, type}) => {
    return message !== null ?
        <div className={type}>{message}</div> :
        null
}

export default Notification