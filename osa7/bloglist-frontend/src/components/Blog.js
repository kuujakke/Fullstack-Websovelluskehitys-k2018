import React from 'react'
import Comments from './Comments'
import { initializeUsers } from '../reducers/userReducer'
import { connect } from 'react-redux'
import { destroyBlog, likeBlog } from '../reducers/blogReducer'
import Heading from './Heading'
import { Button, Card, Grid, Icon, Label } from 'semantic-ui-react'

class Blog extends React.Component {

    likeHandler = (blog) => async () => {
        await this.props.likeBlog(blog.id)
    }

    deleteHandler = (blog) => async (event) => {
        event.preventDefault()
        if (window.confirm(`Really delete ${blog.title} by ${blog.author}?`)) {
            this.props.history.push('/')
            await this.props.destroyBlog(blog.id, this.props.user.token)
        }
    }

    render () {
        const blog = this.props.blog
        console.log(this.props)
        return (
            <Grid columns={3}>
                <Grid.Row centered>
                    <Grid.Column width={14}>
                        <Heading title={`${blog.title} by ${blog.author}`}
                                 history={this.props.history}/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column width={14}>
                        <Card centered>
                            <Card.Content>
                                <Card.Header
                                    className={'blog-title'}>{blog.title}</Card.Header>
                                <Card.Meta
                                    className={'blog-author'}>by {blog.author}</Card.Meta>
                                <Card.Content
                                    className={'blog-url'}><a>{blog.url}</a></Card.Content>
                            </Card.Content>
                            <Card.Content textAlign={'center'}>
                                <Button as='div' labelPosition='left'>
                                    <Label as='a' basic
                                           pointing='right'>{blog.likes}</Label>
                                    <Button onClick={this.likeHandler(blog)}
                                            icon>
                                        <Icon name='heart'/>
                                        Like
                                    </Button>
                                </Button> likes
                            </Card.Content>
                            <Card.Content textAlign={'center'}>
                                {this.props.blog.user
                                    ? blog.user.username.toString() ===
                                    this.props.user.username.toString()
                                        ? <Button onClick={this.deleteHandler(
                                            blog)}>Delete</Button>
                                        : null
                                    : null
                                }
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column width={14}>
                        <Comments blogId={blog.id}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        blog: state.blogs.find(b => b.id === ownProps.blogId),
        user: state.login,
        history: ownProps.history,
    }
}

const mapDispatchToProps = {
    initializeUsers, likeBlog, destroyBlog,
}

const ConnectedBlog = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Blog)

export default ConnectedBlog