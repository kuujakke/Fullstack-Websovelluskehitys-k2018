import React from 'react'

class Notification extends React.Component {
    render () {
        const style = {
            border: 'solid',
            padding: 10,
            borderWidth: 1,
        }
        const message = this.props.store.getState().notification.message
        if (message !== null) {
            return (
                <div style={style}>
                    {message}
                </div>
            )
        }
        return null
    }
}

export default Notification
