import React from 'react'
import { Link } from 'react-router-dom'

class BlogList extends React.Component {
    render () {
        return (
            <div className={'blog-list'}>
                <table>
                    <tbody>
                    {this.props.blogs.sort((a, b) => b.likes - a.likes).map(
                        blog =>
                            <tr>
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

export default BlogList