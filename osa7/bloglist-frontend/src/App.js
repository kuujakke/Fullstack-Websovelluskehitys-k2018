import React from 'react'
import { connect } from 'react-redux'
import {
    BrowserRouter as Router, Redirect, Route,
} from 'react-router-dom'
import Users from './components/Users'
import UserInfo from './components/UserInfo'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import { notifyWith } from './reducers/notificationReducer'
import { initializeUsers } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'
import Login from './components/Login'
import { setUser } from './reducers/loginReducer'

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

    getLocalUser = () => {
        const loggedUser = window.localStorage.getItem('loggedUser')
        if (loggedUser) {
            return JSON.parse(loggedUser)
        }
        return {token: undefined}
    }

    async componentDidMount () {
        await this.props.initializeUsers()
        await this.props.initializeBlogs()
        const localUser = this.getLocalUser()
        if (!this.props.user.token && localUser.token) {
            this.props.setUser(localUser)
        }
    }

    render () {
        const localUser = this.getLocalUser()
        return (
            <Router>
                <div>
                    <Route exact path={'/'} render={() => localUser ?
                        <Redirect to={'/blogs'}/> : <Redirect to={'/login'}/>}/>
                    <Route exact path={'/login'} render={({history}) =>
                        <Login history={history}/>}/>
                    <Route exact path={'/blogs'} render={({history}) =>
                        localUser.token ? <Blogs history={history}/> :
                            <Redirect to={'/login'}/>}/>
                    <Route exact path={'/users'} render={({history}) =>
                        localUser.token ? <Users history={history}/> :
                            <Redirect to={'/login'}/>}/>
                    <Route path={'/users/:id'} render={({match, history}) =>
                        localUser.token ? <UserInfo
                            userId={match.params.id}
                            history={history}/> : <Redirect to={'/login'}/>}/>
                    <Route path={'/blogs/:id'} render={({match, history}) =>
                        localUser.token ? <Blog
                            blogId={match.params.id}
                            user={this.state.user}
                            history={history}/> : <Redirect to={'/login'}/>}/>
                </div>
            </Router>
        )
    }
}

const mapStateToProps = (state) => {
    return {user: state.login}
}

const mapDispatchToProps = {
    notifyWith, initializeUsers, initializeBlogs, setUser
}

const ConnectedApp = connect(
    mapStateToProps,
    mapDispatchToProps,
)(App)

export default ConnectedApp
