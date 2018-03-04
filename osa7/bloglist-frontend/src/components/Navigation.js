import React from 'react'
import { NavLink } from 'react-router-dom'

class Navigation extends React.Component {
    render () {
        const activeStyle = {
            color: 'red',
        }
        const style = {
            color: 'blue',
            border: 'solid',
            fontSize: 20,
            borderRadius: 10,
            padding: 10,
            textDecoration: 'none',
        }
        return (
            <div>
                <NavLink exact to="/" activeStyle={activeStyle}
                         style={style}>Blogs</NavLink>
                <NavLink to="/users" activeStyle={activeStyle}
                         style={style}>Users</NavLink>
                <p>
                    {this.props.name} logged in
                    <button type="submit"
                            onClick={this.props.logoutHandler}>
                        logout
                    </button>
                </p>
            </div>
        )
    }
}

export default Navigation