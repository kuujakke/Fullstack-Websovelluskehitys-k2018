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
import userService from './services/users'
import Blog from './components/Blog'

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
            this.flashMessage({text: 'Login successful!', type: 'success'})
        } catch (exception) {
            this.flashMessage({
                text: 'Incorrect username or password!',
                type: 'error',
            })
        }
    }

    handleLogout = () => {
        window.localStorage.removeItem('loggedUser')
        this.setState({user: null})
        this.flashMessage({text: 'Successfully logged out.', type: 'success'})
    }

    handleCredentialChange = (event) => {
        let newCredentials = this.state.credentials
        newCredentials[event.target.title] = event.target.value
        this.setState({credentials: newCredentials})
    }

    handleLike = (blog) => async () => {
        blog.likes++
        await blogService.update(blog)
        this.updateBlog(blog)
    }

    handleDelete = (blog) => async () => {
        await blogService.destroy(blog)
        window.confirm(`Really delete ${blog.title} by ${blog.author}?`)
            ? this.deleteBlog(blog)
            : null
    }

    flashMessage = (message) => {
        this.setState({message})
        setTimeout(() => {
            this.setState({message: null})
        }, 5000)
    }

    addBlog = (blog) => {
        let blogs = this.state.blogs
        blog.user = this.state.user
        blogs = blogs.concat(blog)
        this.setState({blogs})
        this.blogForm.toggleVisibility()
    }

    updateBlog = (blog) => {
        let blogsWithoutOne = this.state.blogs.filter(b => b.id !== blog.id)
        let updatedBlogs = blogsWithoutOne.concat(blog)
        this.setState({blogs: updatedBlogs})
    }

    deleteBlog = (blog) => {
        let blogsWithoutOne = this.state.blogs.filter(b => b.id !== blog.id)
        this.setState({blogs: blogsWithoutOne})
    }

    async componentDidMount () {
        const blogs = await blogService.getAll()
        this.setState({blogs})

        const users = await userService.getAll()
        this.setState({users})

        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            console.log(user)
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
        console.log(this.state.blogs)
        return (
            <Router>
                <div>
                    <Notification message={this.state.message}/>
                    <h2>blogs</h2>
                    <p>
                        {this.state.user.name} logged in
                        <button type="submit"
                                onClick={this.handleLogout}>
                            logout
                        </button>
                    </p>
                    <Route exact path={'/'} render={() =>
                        <div>
                            <BlogList blogs={this.state.blogs}
                                      user={this.state.user}
                                      handleLike={this.handleLike}
                                      handleDelete={this.handleDelete}/>
                            <Toggleable buttonLabel="Create blog"
                                        ref={
                                            component => this.blogForm = component}>
                                <BlogForm flashMessage={this.flashMessage}
                                          addBlog={this.addBlog}/>
                            </Toggleable>
                        </div>}/>
                    <Route exact path={'/users'} render={() =>
                        <UserList/>}/>
                    <Route exact path={'/users/:id'}
                           render={({match}) => <UserInfo
                               user={this.state.users.find(
                                   u => u.id === match.params.id)}/>}/>
                    <Route exact path={'/blogs/:id'}
                           render={({match}) => <Blog key={match.params.id}
                                                      blog={this.state.blogs.find(
                                                          b => b.id ===
                                                              match.params.id)}
                                                      likeHandler={this.handleLike}
                                                      deleteHandler={this.handleDelete}
                                                      user={this.state.user}/>}/>
                </div>
            </Router>
        )
    }
}

export default App
