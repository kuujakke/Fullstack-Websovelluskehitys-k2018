import React from 'react'
import userService from '../services/users'

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
                        <td>{user.name}</td>
                        <td>{user.blogs.length}</td>
                    </tr>,
                )}
                </tbody>
            </table>
        )
    }
}

export default UserList
