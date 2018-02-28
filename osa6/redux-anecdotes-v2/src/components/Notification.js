import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {
    render () {
        const style = {
            border: 'solid',
            padding: 10,
            borderWidth: 1,
        }
        const message = this.props.notification.message
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

const mapStateToProps = (state) => {
    return {
        notification: state.notification
    }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification
