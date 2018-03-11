import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'

class BlogList extends React.Component {
    render () {
        return (
            <Table selectable unstackable>
                <Table.Body>
                    {this.props.blogs.sort((a, b) => b.likes - a.likes).map(
                        blog =>
                            <Table.Row key={blog.id}>
                                <Table.Cell textAlign={'center'}>
                                    <Link to={`/blogs/${blog.id}`}>
                                        {blog.title} by {blog.author}
                                    </Link>
                                </Table.Cell>
                            </Table.Row>,
                    )}
                </Table.Body>
            </Table>
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