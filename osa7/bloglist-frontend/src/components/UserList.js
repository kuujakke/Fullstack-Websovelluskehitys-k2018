import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'

class UserList extends React.Component {
    render () {
        return (
            <Table className={'user-list'} celled compact={'very'} selectable unstackable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Blogs added</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.props.users.map(user =>
                        <Table.Row key={user.id}>
                            <Table.Cell><Link to={`/users/${user.id}`}>
                                {user.name}</Link></Table.Cell>
                            <Table.Cell>{user.blogs.length}</Table.Cell>
                        </Table.Row>,
                    )}
                </Table.Body>
            </Table>
        )
    }
}

const mapStateToProps = (state) => {
    return {users: state.users}
}

const ConnectedUserList = connect(
    mapStateToProps,
)(UserList)

export default ConnectedUserList
