import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class BlogList extends React.Component {
    render () {
        console.log(this.props)
        return (
            <div className={'blog-list'}>
                <table>
                    <tbody>
                    {this.props.blogs.sort((a, b) => b.likes - a.likes).map(
                        blog =>
                            <tr key={blog.id}>
                                <td>
                                    <Link to={`/blogs/${blog.id}`}>
                                        {blog.title} by {blog.author}
                                    </Link>
                                </td>
                            </tr>
                    )}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {blogs: state.blogs}
}

const ConnectedBlogList = connect(
    mapStateToProps,
)(BlogList)

export default ConnectedBlogList