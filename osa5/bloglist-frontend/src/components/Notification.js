import React from 'react'

const Notification = ({message}) => {
    return message !== null ?
        <div className={message.type}>{message.text}</div> : null
}

export default Notification