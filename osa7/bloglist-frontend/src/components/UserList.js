import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Heading from './Heading'

class UserList extends React.Component {
    render () {
        return (
            <div>
                <Heading title={'Users'} history={this.props.history}/>
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
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {users: state.users, history: ownProps.history}
}

const ConnectedUserList = connect(
    mapStateToProps,
)(UserList)

export default ConnectedUserList
