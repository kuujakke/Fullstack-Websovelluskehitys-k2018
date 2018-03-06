import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { initializeUsers } from '../reducers/userReducer'


class UserList extends React.Component {
    async componentDidMount () {
        this.props.initializeUsers()
    }

    render () {
        return (
            <table className={'user-list'}>
                <tbody>
                <tr>
                    <th>Name</th>
                    <th>Blogs added</th>
                </tr>
                {this.props.users.map(user =>
                    <tr key={user.id}>
                        <td><Link to={`/users/${user.id}`}>
                            {user.name}</Link></td>
                        <td>{user.blogs.length}</td>
                    </tr>,
                )}
                </tbody>
            </table>
        )
    }
}

const mapStateToProps = (state) => {
    return {users: state.users}
}

const mapDispatchToProps = {
    initializeUsers,
}

const ConnectedUserList = connect(
    mapStateToProps,
    mapDispatchToProps,
)(UserList)

export default ConnectedUserList
