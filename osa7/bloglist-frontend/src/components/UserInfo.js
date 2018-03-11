import React from 'react'
import { connect } from 'react-redux'
import Heading from './Heading'
import { Card, Grid } from 'semantic-ui-react'

class UserInfo extends React.Component {
    render () {
        console.log(this.props)
        return (
            <Grid columns={3}>
                <Grid.Row centered>
                    <Grid.Column width={14}>
                        <Heading title={`Users`}
                                 history={this.props.history}/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column width={14}>
                        <Card centered>
                            <Card.Content>
                                <Card.Header>{this.props.user.name}</Card.Header>
                                <h3>Added blogs</h3>
                                <ul>
                                    {this.props.user.blogs.map(
                                        b => <li key={b.id}>{b.title} by {b.author}</li>)}
                                </ul>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log(state)
    return {
        user: state.users.find(u => u.id === ownProps.userId),
    }
}

const ConnectedUserInfo = connect(
    mapStateToProps,
)(UserInfo)

export default ConnectedUserInfo