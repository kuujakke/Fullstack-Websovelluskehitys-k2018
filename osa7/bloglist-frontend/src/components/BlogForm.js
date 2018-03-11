import React from 'react'
import { connect } from 'react-redux'
import { notifyWith } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import { Button, Form } from 'semantic-ui-react'

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
            }, this.props.user.token)
            if (blog) {
                this.props.notifyWith(
                    {
                        message: 'Successfully created blog entry!',
                        success: true,
                    })
            } else {
                this.props.notifyWith(
                    {
                        message: 'Error creating blog entry!',
                        error: true,
                    })
            }
            this.setState({author: '', title: '', url: ''})
        } catch (exception) {
            console.log(exception)
            this.props.notifyWith(
                {
                    message: 'Something went wrong!',
                    error: true,
                })
        }

    }

    render () {
        console.log(this.props.user)
        return (
            <Form onSubmit={this.handleCreate}>
                <Form.Field>
                    <label>Title:</label>
                    <input type="text" title={'title'}
                           value={this.state.title}
                           onChange={this.handleChange}/>
                </Form.Field>
                <Form.Field>
                    <label>Author:</label>
                    <input type="text" title={'author'}
                           value={this.state.author}
                           onChange={this.handleChange}/>
                </Form.Field>
                <Form.Field>
                    <label>Url:</label>
                    <input type="text" title={'url'}
                           value={this.state.url}
                           onChange={this.handleChange}/>
                </Form.Field>
                <Button type="submit">Create</Button>
            </Form>
        )
    }
}

const mapStateToProps = (state) => {
    return {user: state.login}
}

const mapDispatchToProps = {
    notifyWith, createBlog,
}

const ConnectedBlogForm = connect(
    mapStateToProps,
    mapDispatchToProps,
)(NewBlog)

export default ConnectedBlogForm