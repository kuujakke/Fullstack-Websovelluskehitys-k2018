const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = (request) => {
    const authorization = request.get('Authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

blogsRouter.get('/', async (request, response) => {
    try {
        const blogs = await Blog.find({}).
            populate('user', {username: 1, name: 1})
        response.status(200).json(blogs.map(Blog.format))
    } catch (exception) {
        console.log(exception)
        response.status(500).json(exception)
    }
})

blogsRouter.post('/', async (request, response) => {
    try {
        const token = getTokenFrom(request)
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return response.status(401).
                json({error: 'token missing or invalid'})
        }
        const user = await User.findById(decodedToken.id)
        const blog = new Blog({
            title: request.body.title,
            author: request.body.author,
            url: request.body.url,
            likes: request.body.likes || 0,
            user: user._id,
        })
        if (blog.title === undefined || blog.url === undefined) {
            return response.status(400).json({error: 'missing required field'})
        }
        const savedBlog = await blog.save()

        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        response.status(201).json(savedBlog)
    } catch (exception) {
        if (exception.name === 'JsonWebTokenError') {
            response.status(401).json({error: exception})
        } else {
            console.log(exception)
            response.status(500).json({
                error: 'Something went horribly wrong!',
                exception: exception,
            })
        }
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    try {
        const res = await Blog.findByIdAndRemove(request.params.id)
        if (res) {
            response.status(200).end()
        } else {
            response.status(404).end()
        }
    } catch (exception) {
        response.status(500).json(exception)
    }
})

blogsRouter.put('/:id', async (request, response) => {
    try {
        const res = await Blog.findByIdAndUpdate(request.params.id,
            request.body)
        if (res) {
            response.status(200).end()
        } else {
            response.status(404).end()
        }
    } catch (exception) {
        response.status(500).json(exception)
    }
})

module.exports = blogsRouter