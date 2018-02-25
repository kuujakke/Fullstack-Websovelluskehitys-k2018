import React from 'react'
import Toggleable from './Toggleable'

const Blog = ({blog, likeHandler, deleteHandler}) => (
    <Toggleable buttonLabel={`${blog.title} ${blog.author}`}>
        <div>
            <p>{blog.title}</p>
            <p>{blog.author}</p>
            <p>{blog.url}</p>
            <p>{blog.likes} likes
                <button onClick={likeHandler(blog)}>Like</button>
            </p>
            <button onClick={deleteHandler(blog)}>Delete</button>
        </div>
    </Toggleable>
)

export default Blog