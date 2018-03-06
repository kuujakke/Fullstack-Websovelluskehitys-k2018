import React from 'react'
import { connect } from 'react-redux'
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
            <div className={'blog-comments'}>
                <h3>Comments</h3>
                <ul>
                    {(this.props.comments &&
                        this.props.comments.length > 0)
                        ? this.props.comments.map(
                            c => <li key={c.id}>{c.content}</li>)
                        : null}
                </ul>
                <form
                    onSubmit={this.commentHandler(this.props.blog,
                        newComment)}>
                    <input onChange={this.changeHandler} name='comment'/>
                    <button type={'submit'}>Add comment</button>
                </form>
            </div>
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
    commentBlog, notifyWith
}

const ConnectedComment = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Comments)

export default ConnectedComment