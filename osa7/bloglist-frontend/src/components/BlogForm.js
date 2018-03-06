import React from 'react'
import blogService from '../services/blogs'
import { notifyWith } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

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
            const blog = await blogService.create({
                author: this.state.author,
                title: this.state.title,
                url: this.state.url,
            })
            console.log(blog)
            if (blog) {
                this.props.addBlog(blog)
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

const mapStateToProps = (state) => {
    return state
}

const mapDispatchToProps = {
    notifyWith,
}

const ConnectedBlogForm = connect(
    mapStateToProps,
    mapDispatchToProps,
)(NewBlog)

export default ConnectedBlogForm