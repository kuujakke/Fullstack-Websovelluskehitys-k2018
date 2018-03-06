import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {
    render () {
        const message = this.props.notification.message
        if (message !== null) {
            return <div className={message.messageType}>{message.message}</div>

        }
        return null
    }
}

const mapStateToProps = (state) => {
    return {
        notification: state.notification,
    }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification
