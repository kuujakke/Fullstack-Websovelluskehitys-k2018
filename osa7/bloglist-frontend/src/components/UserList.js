import React from 'react'
import userService from '../services/users'
import { Link } from 'react-router-dom'

class UserList extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            users: [],
        }
    }

    async componentDidMount () {
        const users = await userService.getAll()
        console.log(users)
        this.setState({users})
    }

    render () {
        return (
            <table className={'user-list'}>
                <tbody>
                <tr>
                    <th>Name</th>
                    <th>Blogs added</th>
                </tr>
                {this.state.users.map(user =>
                    <tr>
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

export default UserList
