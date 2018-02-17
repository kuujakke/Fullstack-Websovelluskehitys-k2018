const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    try {
        const users = await User.find({}).
            populate('blogs', {title: 1, author: 1, url: 1, likes: 1})
        response.status(200).json(users.map(User.format))
    } catch (exception) {
        response.status(500).json(exception)
    }
})

usersRouter.post('/', async (request, response) => {
    try {
        const body = request.body

        if (body.password) {
            if (body.password.length < 3) {
                response.status(400).json({error: 'Password is too short!'})
                return
            }
        } else {
            response.status(400).json({error: 'Undefined password'})
            return
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash,
            adult: body.adult,
        })

        const savedUser = await user.save()
        response.status(201).json(savedUser)

    } catch (exception) {
        if (exception.code === 11000) {
            response.status(400).json({error: 'Duplicate key error!'})
        } else if (exception.name === 'ValidationError') {
            response.status(400).json({error: 'Validation error!'})
        } else if (exception.name === 'TypeError') {
            response.status(400).json({error: 'Type error!'})
        } else {
            console.log(exception.name)
            response.status(500).json({error: 'Something went horribly wrong!'})
        }
    }
})

module.exports = usersRouter