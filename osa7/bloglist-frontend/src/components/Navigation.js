import React from 'react'
import { NavLink } from 'react-router-dom'
import { notifyWith } from '../reducers/notificationReducer'
import { logoutUser } from '../reducers/loginReducer'
import { connect } from 'react-redux'

class Navigation extends React.Component {

    logoutHandler = () => {
        this.props.logoutUser()
        this.props.notifyWith(
            {message: 'Successfully logged out.', messageType: 'success'})
        this.props.history.push('/login')
    }

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
                    {this.props.user.name} logged in
                    <button type="submit"
                            onClick={this.logoutHandler}>
                        logout
                    </button>
                </p>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {user: state.login, history: ownProps.history}
}

const mapDispatchToProps = {
    notifyWith, logoutUser
}

const ConnectedNavigation = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Navigation)

export default ConnectedNavigation