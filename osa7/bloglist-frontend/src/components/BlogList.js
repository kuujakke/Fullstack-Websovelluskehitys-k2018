import React from 'react'
import Blog from './Blog'

class BlogList extends React.Component {
    render () {
        return (
            <div className={'blog-list'}>
                {this.props.blogs.sort((a, b) => b.likes - a.likes).map(
                    blog => <Blog key={blog.id} blog={blog}
                                  likeHandler={this.props.handleLike}
                                  deleteHandler={this.props.handleDelete}
                                  user={this.props.user}/>,)}
            </div>
        )
    }
}

export default BlogList