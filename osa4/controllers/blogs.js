const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog.find({}).then(blogs => {
        response.json(blogs)
    }).catch(error => {
        response.status(500).json(error)
    })
})

blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
    if (blog.likes === undefined) {
        blog.likes = 0
    }
    if (blog.title === undefined || blog.url === undefined) {
        response.status(400).end()
    }
    blog.save().then(result => {
        response.status(201).json(result)
    }).catch(error => {
        response.status(500).json(error)
    })
})

module.exports = blogsRouter