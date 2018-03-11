import React from 'react'
import { notifyWith } from '../reducers/notificationReducer'
import { logoutUser } from '../reducers/loginReducer'
import { connect } from 'react-redux'
import { Menu } from 'semantic-ui-react'
import { setActiveItem } from '../reducers/navigationReducer'

class Navigation extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            activeItem: 'blogs',
        }
    }

    logoutHandler = () => {
        this.props.logoutUser()
        this.props.notifyWith(
            {message: 'Successfully logged out.', messageType: 'success'})
        this.props.history.push('/login')
    }

    handleItemClick = (e, {name}) => {
        this.props.setActiveItem(name)
        this.props.history.push(`/${name}`)
    }

    render () {
        let user
        if (this.props.user.name) {
            user = this.props.user
        } else {
            let loggedUser = window.localStorage.getItem('loggedUser')
            user = JSON.parse(loggedUser)
        }
        const activeItem = this.props.activeItem
        return (
            <Menu>
                <Menu.Item
                    name={'blogs'}
                    active={activeItem === 'blogs'}
                    onClick={this.handleItemClick}
                >Blogs</Menu.Item>
                <Menu.Item
                    name={'users'}
                    active={activeItem === 'users'}
                    onClick={this.handleItemClick}
                >Users</Menu.Item>
                <Menu.Menu position={'right'}>
                    <Menu.Item header>{user.username}</Menu.Item>
                    <Menu.Item
                        name={'logout'}
                        active={activeItem === 'logout'}
                        onClick={this.logoutHandler}
                    >Logout</Menu.Item>
                </Menu.Menu>
            </Menu>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.login,
        history: ownProps.history,
        activeItem: state.navigation.activeItem,
    }
}

const mapDispatchToProps = {
    notifyWith, logoutUser, setActiveItem,
}

const ConnectedNavigation = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Navigation)

export default ConnectedNavigation