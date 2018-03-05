import React from 'react'

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

    render () {
        const newComment = {id: this.state.id, content: this.state.content}
        return (
            <div className={'blog-comments'}>
                <h3>Comments</h3>
                <ul>
                    {(this.props.blog.comments &&
                        this.props.blog.comments.length > 0)
                        ? this.props.blog.comments.map(
                            c => <li key={c.id}>{c.content}</li>)
                        : null}
                </ul>
                <form
                    onSubmit={this.props.commentHandler(this.props.blog,
                        newComment)}>
                    <input onChange={this.changeHandler}/>
                    <button type={'submit'}>Add comment</button>
                </form>
            </div>
        )
    }
}

export default Comments