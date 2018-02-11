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
        const res = await Blog.findOneAndRemove({_id: request.params.id})
        if (res) {
            response.status(200).end()
        } else {
            response.status(404).end()
        }
    } catch (exception) {
        response.status(500).end()
    }
})

module.exports = blogsRouter