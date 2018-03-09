import React from 'react'
import { notifyWith } from '../reducers/notificationReducer'
import { loginUser } from '../reducers/loginReducer'
import { connect } from 'react-redux'
import Notification from './Notification'

class LoginForm extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
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
            await this.props.loginUser(this.state.credentials)
            this.props.notifyWith(
                {message: 'Login successful!', messageType: 'success'})
            this.props.history.push('/')
        } catch (exception) {
            this.props.notifyWith({
                message: 'Incorrect username or password!',
                messageType: 'error',
            })
        }
    }

    handleCredentialChange = (event) => {
        let newCredentials = this.state.credentials
        newCredentials[event.target.title] = event.target.value
        this.setState({credentials: newCredentials})
    }

    render () {
        return (
            <div>
                <h1>Log in to application</h1>
                <Notification/>
                <form onSubmit={this.handleLogin} className={'login-form'}>
                    <div className={'login-username'}>
                        <label>käyttäjätunnus</label>
                        <input type="text" title={'username'}
                               value={this.state.credentials.username}
                               onChange={this.handleCredentialChange}/>
                    </div>
                    <div className={'login-password'}>
                        <label>salasana</label>
                        <input type="password" title={'password'}
                               value={this.state.credentials.password}
                               onChange={this.handleCredentialChange}/>
                    </div>
                    <button type="submit" className={'login-submit'}>kirjaudu
                    </button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {history: ownProps.history}
}

const mapDispatchToProps = {
    loginUser, notifyWith,
}

const ConnectedLoginForm = connect(
    mapStateToProps,
    mapDispatchToProps,
)(LoginForm)

export default ConnectedLoginForm