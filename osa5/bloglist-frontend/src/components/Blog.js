import React from 'react'
import Toggleable from './Toggleable'

const Blog = ({blog, likeHandler, deleteHandler, user}) => (
    <Toggleable buttonLabel={`${blog.title} ${blog.author}`}>
        <div>
            <p>{blog.title}</p>
            <p>{blog.author}</p>
            <p>{blog.url}</p>
            <p>{blog.likes} likes
                <button onClick={likeHandler(blog)}>Like</button>
            </p>
            {console.log(typeof blog.user)}
            {blog.user !== undefined || typeof blog.user !== 'undefined'
                ? blog.user.username.toString() === user.username.toString()
                    ? <button onClick={deleteHandler(blog)}>Delete</button>
                    : null
                : null
            }
        </div>
    </Toggleable>
)

export default Blog