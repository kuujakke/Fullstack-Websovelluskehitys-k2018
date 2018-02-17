const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

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

blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
    if (blog.likes === undefined) {
        blog.likes = 0
    }
    if (blog.title === undefined || blog.url === undefined) {
        response.status(400).end()
        return
    }
    blog.save().then(result => {
        response.status(201).json(result)
    }).catch(error => {
        response.status(500).json(error)
    })
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