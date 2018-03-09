import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Heading from './Heading'

class BlogList extends React.Component {
    render () {
        return (
            <div className={'blog-list'}>
                <Heading title={'Blogs'} history={this.props.history}/>
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

const mapStateToProps = (state, ownProps) => {
    return {blogs: state.blogs, history: ownProps.history}
}

const ConnectedBlogList = connect(
    mapStateToProps,
)(BlogList)

export default ConnectedBlogList