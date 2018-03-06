import React from 'react'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import UserInfo from './components/UserInfo'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Login from './components/Login'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Blog from './components/Blog'
import Navigation from './components/Navigation'
import { notifyWith } from './reducers/notificationReducer'
import { connect } from 'react-redux'
import { initializeUsers } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'

class App extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            blogs: [],
            users: [],
            user: null,
            credentials: {
                username: '',
                password: '',
            },
            message: null,
        }
    }

    handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login(this.state.credentials)
            window.localStorage.setItem('loggedUser', JSON.stringify(user))
            this.setState({credentials: {username: '', password: ''}, user})
            this.props.notifyWith(
                {message: 'Login successful!', messageType: 'success'})
        } catch (exception) {
            this.props.notifyWith({
                message: 'Incorrect username or password!',
                messageType: 'error',
            })
        }
    }

    handleLogout = () => {
        window.localStorage.removeItem('loggedUser')
        this.setState({user: null})
        this.props.notifyWith(
            {message: 'Successfully logged out.', messageType: 'success'})
    }

    handleCredentialChange = (event) => {
        let newCredentials = this.state.credentials
        newCredentials[event.target.title] = event.target.value
        this.setState({credentials: newCredentials})
    }

    addBlog = (blog) => {
        let blogs = this.state.blogs
        blog.user = this.state.user
        blogs = blogs.concat(blog)
        this.setState({blogs})
        this.blogForm.toggleVisibility()
    }

    async componentDidMount () {
        await this.props.initializeUsers()
        await this.props.initializeBlogs()
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            this.setState({user})
            blogService.setToken(user.token)
        }
    }

    render () {
        if (this.state.user === null) {
            return (
                <div>
                    <Notification message={this.state.message}/>
                    <h1>Log in to application</h1>
                    <Login key={'login'} handleLogin={this.handleLogin}
                           handleCredentialChange={this.handleCredentialChange}
                           credentials={this.state.credentials}/>
                </div>
            )
        }
        return (
            <Router>
                <div>
                    <h1>Blogs</h1>
                    <Navigation name={this.state.user.name}
                                logoutHandler={this.handleLogout}/>
                    <Notification/>
                    <Route exact path={'/'} render={() =>
                        <div>
                            <BlogList/>
                            <Toggleable buttonLabel="Create blog"
                                        ref={
                                            component => this.blogForm = component}>
                                <BlogForm user={this.state.user}/>
                            </Toggleable>
                        </div>}/>
                    <Route exact path={'/users'} render={() =>
                        <UserList/>}/>
                    <Route exact path={'/users/:id'}
                           render={({match}) => <UserInfo
                               userId={match.params.id}/>}/>
                    <Route exact path={'/blogs/:id'}
                           render={({match, history}) => <Blog
                               blogId={match.params.id}
                               user={this.state.user} history={history}/>}/>
                </div>
            </Router>
        )
    }
}

const mapStateToProps = (state) => {
    return state
}

const mapDispatchToProps = {
    notifyWith, initializeUsers, initializeBlogs,
}

const ConnectedApp = connect(
    mapStateToProps,
    mapDispatchToProps,
)(App)

export default ConnectedApp
