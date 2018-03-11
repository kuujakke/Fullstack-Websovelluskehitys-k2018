import React from 'react'
import { Grid } from 'semantic-ui-react'
import Heading from './Heading'
import UserList from './UserList'

const Users = ({history}) => {
    return (
        <Grid columns={3} divided>
            <Grid.Row centered>
                <Grid.Column width={14}>
                    <Heading title={'Users'} history={history}/>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row centered>
                <Grid.Column width={14}>
                    <UserList/>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default Users