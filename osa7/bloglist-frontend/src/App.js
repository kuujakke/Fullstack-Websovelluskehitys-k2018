import React from 'react'
import UserList from './components/UserList'
import UserInfo from './components/UserInfo'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import {
    BrowserRouter as Router, Redirect, Route,
} from 'react-router-dom'
import Blog from './components/Blog'
import { connect } from 'react-redux'
import { notifyWith } from './reducers/notificationReducer'
import { initializeUsers } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'
import Home from './components/Home'

class App extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            user: null,
        }
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
        return (
            <Router>
                <div>
                    <Route exact path={'/login'} render={({history}) =>
                        <LoginForm history={history}/>}/>
                    <Route exact path={'/'} render={({history}) =>
                        this.state.user ? <Home history={history}/> :
                            <Redirect to={'/login'}/>}/>
                    <Route path={'/users'} render={({history}) =>
                        this.state.user ? <UserList history={history}/> :
                            <Redirect to={'/login'}/>}/>
                    <Route path={'/users/:id'}
                           render={({match, history}) =>
                               <UserInfo
                                   userId={match.params.id}
                                   history={history}/>}/>
                    <Route path={'/blogs/:id'}
                           render={({match, history}) =>
                               <Blog
                                   blogId={match.params.id}
                                   user={this.state.user}
                                   history={history}/>}/>
                </div>
            </Router>
        )
    }
}

const mapStateToProps = (state) => {
    return {login: state.login}
}

const mapDispatchToProps = {
    notifyWith, initializeUsers, initializeBlogs,
}

const ConnectedApp = connect(
    mapStateToProps,
    mapDispatchToProps,
)(App)

export default ConnectedApp
