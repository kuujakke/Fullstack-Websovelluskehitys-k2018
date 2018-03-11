import React from 'react'
import { Grid } from 'semantic-ui-react'
import Notification from './Notification'
import LoginForm from './LoginForm'

const Login = ({history}) => {
    return (
        <Grid>
            <Grid.Row>
                <Grid.Column>
                    <Notification/>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <LoginForm history={history}/>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default Login