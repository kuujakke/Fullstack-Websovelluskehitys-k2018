import React from 'react'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'

class Notification extends React.Component {
    render () {
        const notification = this.props.notification.message
        if (notification !== null) {
            return <Message error={notification.error}
                            success={notification.success} floating>
                <Message.Header>{notification.message}</Message.Header>
            </Message>
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
