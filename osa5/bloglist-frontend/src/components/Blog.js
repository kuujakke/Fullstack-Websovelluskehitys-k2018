import React from 'react'
import Toggleable from './Toggleable'

const Blog = ({blog}) => (
    <Toggleable buttonLabel={`${blog.title} ${blog.author}`}>
        <div>
            <p>{blog.title}</p>
            <p>{blog.author}</p>
            <p>{blog.url}</p>
            <p>{blog.likes} likes<button>Like</button></p>
        </div>
    </Toggleable>
)

export default Blog