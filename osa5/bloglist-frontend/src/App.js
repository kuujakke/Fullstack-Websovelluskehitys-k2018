import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import loginService from './services/login'

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
        }
    }

    handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login(this.state.credentials)

            this.setState({credentials: {username: '', password: ''}, user})
        } catch (exception) {
            this.setState({
                error: 'käyttäjätunnus tai salasana virheellinen',
            })
            setTimeout(() => {
                this.setState({error: null})
            }, 5000)
        }
    }

    handleCredentialChange = (event) => {
        let newCredentials = this.state.credentials
        newCredentials[event.target.title] = event.target.value
        this.setState({credentials: newCredentials})
    }

    componentDidMount () {
        blogService.getAll().then(blogs =>
            this.setState({blogs}),
        )
    }

    render () {
        if (this.state.user === null) {
            return (
                <div>
                    <h1>Log in to application</h1>
                    <Login key={'login'} handleLogin={this.handleLogin}
                           handleCredentialChange={this.handleCredentialChange}
                           credentials={this.state.credentials}/>
                </div>
            )
        }
        return (
            <div>
                <h2>blogs</h2>
                <p>{this.state.user.name} logged in</p>
                {this.state.blogs.map(
                    blog => <Blog key={blog.id} blog={blog}/>,)}
            </div>
        )
    }
}

export default App
