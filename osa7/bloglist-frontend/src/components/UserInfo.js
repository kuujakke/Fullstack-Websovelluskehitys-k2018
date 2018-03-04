import React from 'react'

class UserInfo extends React.Component {
    render () {
        console.log(this.props.user)
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

export default UserInfo