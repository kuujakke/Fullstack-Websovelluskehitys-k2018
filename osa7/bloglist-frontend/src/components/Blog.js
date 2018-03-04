import React from 'react'
import Toggleable from './Toggleable'

const Blog = ({blog, likeHandler, deleteHandler, user}) => (
    <Toggleable buttonLabel={`${blog.title} ${blog.author}`}>
        <div className={'blog-details'}>
            <p className={'blog-title'}>{blog.title}</p>
            <p className={'blog-author'}>{blog.author}</p>
            <p className={'blog-url'}>{blog.url}</p>
            <p className={'blog-likes'}>{blog.likes} likes
                <button onClick={likeHandler(blog)}
                        className={'blog-like-button'}>Like</button>
            </p>
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