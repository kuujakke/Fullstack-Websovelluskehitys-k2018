import React from 'react'
import Comments from './Comments'
import { initializeUsers } from '../reducers/userReducer'
import { connect } from 'react-redux'
import { destroyBlog, likeBlog } from '../reducers/blogReducer'
import Heading from './Heading'

class Blog extends React.Component {

    likeHandler = (blog) => async () => {
        await this.props.likeBlog(blog.id)
    }

    deleteHandler = (blog) => async (event) => {
        event.preventDefault()
        if (window.confirm(`Really delete ${blog.title} by ${blog.author}?`)) {
            this.props.history.push('/')
            await this.props.destroyBlog(blog.id)
        }
    }

    render () {
        const blog = this.props.blog
        return (
            <div>
                <Heading title={`${blog.title} by ${blog.author}`}
                         history={this.props.history}/>
                <div className={'blog-details'}>
                    <p className={'blog-title'}>{blog.title}</p>
                    <p className={'blog-author'}>{blog.author}</p>
                    <p className={'blog-url'}>{blog.url}</p>
                    <p className={'blog-likes'}>{blog.likes} likes
                        <button onClick={this.likeHandler(blog)}
                                className={'blog-like-button'}>Like</button>
                    </p>
                    {blog.user !== undefined
                        ? blog.user.username.toString() ===
                        this.props.user.username.toString()
                            ? <button onClick={this.deleteHandler(
                                blog)}>Delete</button>
                            : null
                        : null
                    }
                </div>
                <Comments blogId={blog.id}/>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        blog: state.blogs.find(b => b.id === ownProps.blogId),
        user: ownProps.user,
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