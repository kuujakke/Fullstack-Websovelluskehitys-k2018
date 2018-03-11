import React from 'react'
import { connect } from 'react-redux'
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import { commentBlog } from '../reducers/blogReducer'
import { notifyWith } from '../reducers/notificationReducer'

class Comments extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            id: '',
            content: '',
        }
    }

    getRandomId = () => {
        return Math.floor(Math.random() * 99999)
    }

    changeHandler = (event) => {
        this.setState({content: event.target.value})
    }

    componentDidMount = () => {
        this.setState({id: this.getRandomId()})
    }

    commentHandler = (blog, comment) => async (event) => {
        event.preventDefault()
        event.target.comment.value = ''
        await this.props.commentBlog(blog.id, comment)
        this.props.notifyWith({
            message: `Commented succesfully on blog ${blog.title} by ${blog.author}`,
            messageType: 'success',
        })
    }

    render () {
        const newComment = {id: this.state.id, content: this.state.content}
        return (
            <Comment.Group>
                <Header>Comments</Header>
                {(this.props.comments &&
                    this.props.comments.length > 0)
                    ? this.props.comments.map(c =>
                        <Comment key={c.id}>
                            <Comment.Avatar src='https://cdn.pixabay.com/photo/2016/03/31/19/58/avatar-1295430_960_720.png'/>
                            <Comment.Content>
                                <Comment.Text content={c.content}/>
                            </Comment.Content>
                        </Comment>)
                    : null}
                <Form
                    onSubmit={this.commentHandler(this.props.blog,
                        newComment)} reply>
                    <input onChange={this.changeHandler} name='comment'/>
                    <Button type={'submit'}>Add comment</Button>
                </Form>
            </Comment.Group>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        comments: state.blogs.find(b => b.id === ownProps.blogId).comments,
        blog: state.blogs.find(b => b.id === ownProps.blogId),
    }
}

const mapDispatchToProps = {
    commentBlog, notifyWith,
}

const ConnectedComment = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Comments)

export default ConnectedComment