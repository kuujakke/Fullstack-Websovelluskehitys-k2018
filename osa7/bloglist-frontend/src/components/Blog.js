import React from 'react'

const Blog = ({blog, likeHandler, deleteHandler, user}) => (
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
)

export default Blog