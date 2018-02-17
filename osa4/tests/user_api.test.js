const supertest = require('supertest')
const {app, server} = require('../index')
const api = supertest(app)
const User = require('../models/user')
const testData = require('./test_data')
const helper = require('../utils/helper')

beforeAll(async () => {
    await User.remove({})
    await User.insertMany(testData.users)
})

describe('GET request on /api/users', () => {
    test('initial users are returned as json', async () => {
        await api.get('/api/users').
            expect(200).
            expect('Content-Type', /application\/json/)
    })

    test('initial users are returned in an array', async () => {
        const response = await api.get('/api/users')
        expect(response.body.length).toBe(testData.users.length)
        testData.users.forEach(user => {
            expect(response.body).toContainEqual(User.format(user))
        })
    })
})

describe('POST request on /api/users', () => {
    test('new user is inserted into the database', async () => {
        const usersBefore = await helper.usersInDb()
        await api.post('/api/users').
            send(testData.newUser).
            expect(201).
            expect('Content-Type', /application\/json/)
        const usersAfter = await helper.usersInDb()

        expect(usersAfter.length).toBe(usersBefore.length + 1)
        expect(usersAfter.map(u => u.username)).toContainEqual(testData.newUser.username)
    })
})

afterAll(() => {
    server.close()
})