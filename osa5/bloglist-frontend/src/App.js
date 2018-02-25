import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'

class App extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            blogs: [],
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

    flashMessage = (message) => {
        this.setState({message})
        setTimeout(() => {
            this.setState({message: null})
        }, 5000)
    }

    addBlog = (blog) => {
        let blogs = this.state.blogs
        blogs = blogs.concat(blog)
        console.log(blog)
        this.setState({blogs})
        this.blogForm.toggleVisibility()
    }

    componentDidMount () {
        blogService.getAll().then(blogs =>
            this.setState({blogs}),
        )

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
                <div>
                    {this.state.blogs.map(
                        blog => <Blog key={blog.id} blog={blog}/>,)}
                </div>
                <Toggleable buttonLabel="Create blog"
                            ref={component => this.blogForm = component}>
                    <BlogForm flashMessage={this.flashMessage}
                              addBlog={this.addBlog}/>
                </Toggleable>
            </div>
        )
    }
}

export default App
