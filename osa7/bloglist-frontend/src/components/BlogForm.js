import React from 'react'
import { connect } from 'react-redux'
import { notifyWith } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'

class NewBlog extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            author: '',
            title: '',
            url: '',
        }
    }

    handleChange = (event) => {
        this.setState({[event.target.title]: event.target.value})
    }

    handleCreate = async (event) => {
        event.preventDefault()
        try {
            const blog = await this.props.createBlog({
                author: this.state.author,
                title: this.state.title,
                url: this.state.url,
                user: this.props.user,
            })
            if (blog) {
                this.props.notifyWith(
                    {
                        message: 'Succesfully created blog entry!',
                        messageType: 'success',
                    })
            } else {
                this.props.notifyWith(
                    {
                        message: 'Error creating blog entry!',
                        messageType: 'error',
                    })
            }
            this.setState({author: '', title: '', url: ''})
        } catch (exception) {
            console.log(exception)
            this.props.notifyWith(
                {
                    message: 'Something went wrong!',
                    messageType: 'error',
                })
        }

    }

    render () {
        return (
            <form onSubmit={this.handleCreate}>
                <div>Title:
                    <input type="text" title={'title'}
                           value={this.state.title}
                           onChange={this.handleChange}/>
                </div>
                <div>Author:
                    <input type="text" title={'author'}
                           value={this.state.author}
                           onChange={this.handleChange}/>
                </div>
                <div>Url:
                    <input type="text" title={'url'}
                           value={this.state.url}
                           onChange={this.handleChange}/>
                </div>
                <button type="submit">Create</button>
            </form>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {user: ownProps.user}
}

const mapDispatchToProps = {
    notifyWith, createBlog
}

const ConnectedBlogForm = connect(
    mapStateToProps,
    mapDispatchToProps,
)(NewBlog)

export default ConnectedBlogForm