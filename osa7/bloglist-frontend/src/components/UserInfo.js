import React from 'react'
import { initializeUsers } from '../reducers/userReducer'
import { connect } from 'react-redux'

class UserInfo extends React.Component {
    render () {
        return (
            <div>
                <h2>{this.props.user.name}</h2>
                <h3>Added blogs</h3>
                <ul>
                    {this.props.user.blogs.map(
                        b => <li>{b.title} by {b.author}</li>)}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {user: state.users.find(u => u.id === ownProps.userId)}
}

const mapDispatchToProps = {
    initializeUsers,
}

const ConnectedUserInfo = connect(
    mapStateToProps,
    mapDispatchToProps,
)(UserInfo)

export default ConnectedUserInfo