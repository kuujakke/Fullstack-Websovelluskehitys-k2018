import React from 'react'
import { notifyWith } from '../reducers/notificationReducer'
import { loginUser } from '../reducers/loginReducer'
import { connect } from 'react-redux'
import { Button, Card, Form } from 'semantic-ui-react'

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
                {message: 'Login successful!', success: true})
            this.props.history.push('/')
        } catch (exception) {
            this.props.notifyWith({
                message: 'Incorrect username or password!',
                error: true,
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
            <Card centered raised>
                <Card.Content>
                    <Card.Header textAlign={'center'}>Kirjaudu sisään</Card.Header>
                    <Card.Description>
                        <Form onSubmit={this.handleLogin}
                              className={'login-form'}>
                            <Form.Field>
                                <label>Käyttäjätunnus</label>
                                <input type="text" title={'username'}
                                       value={this.state.credentials.username}
                                       onChange={this.handleCredentialChange}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Salasana</label>
                                <input type="password" title={'password'}
                                       value={this.state.credentials.password}
                                       onChange={this.handleCredentialChange}/>
                            </Form.Field>
                        </Form>
                    </Card.Description>
                </Card.Content>
                <Card.Content textAlign={'center'}>
                    <Button type="submit"
                            className={'login-submit'}
                            onClick={this.handleLogin}>Kirjaudu
                    </Button>
                </Card.Content>
            </Card>
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