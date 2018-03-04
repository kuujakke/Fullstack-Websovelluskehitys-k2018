const supertest = require('supertest')
const {app, server} = require('../index')
const api = supertest(app)
const testData = require('./test_data')
const helper = require('../utils/helper')

describe('GET request on /api/users', () => {
    test('initial users are returned as json', async () => {
        await api.get('/api/users').
            expect(200).
            expect('Content-Type', /application\/json/)
    })

    test('initial users are returned in an array', async () => {
        const users = await helper.usersInDb()
        const response = await api.get('/api/users')
        await expect(response.body.length).toBe(users.length)
    })
})

describe('POST request on /api/users', () => {
    describe('valid new user', () => {
        test('should be inserted into the database', async () => {
            const user = {...testData.newUser, username: 'valid'}
            const response = await api.post('/api/users').
                set('Authorization',
                    `bearer ${helper.getToken(user._id, user.username)}`).
                send(user).
                expect(201).
                expect('Content-Type', /application\/json/)
            const usersAfter = await helper.usersInDb()

            expect(usersAfter.map(u => u.username)).
                toContainEqual(response.body.username)
        })
    })
    describe('should be validated', () => {
        describe('when username is', () => {
            test('duplicate, user should be rejected', async () => {
                const randomUser = await helper.randomUser()
                const user = {
                    username: randomUser.username,
                    password: 'salaisuus',
                    adult: true,
                }
                const response = await api.post('/api/users').
                    send(user).
                    expect(400)
                expect(response.body.error).toEqual('Duplicate key error!')
            })

            test('undefined, user should be rejected', async () => {
                const newUser = {
                    ...testData.newUser,
                    username: undefined,
                }
                const response = await api.post('/api/users').
                    send(newUser).
                    expect(400)
                expect(response.body.error).toEqual('Validation error!')
            })
        })

        describe('when password is', () => {
            test('too short, the user should be rejected', async () => {
                const newUser = {
                    ...testData.newUser,
                    password: 'qw',
                }
                const response = await api.post('/api/users').
                    send(newUser).
                    expect(400)
                expect(response.body.error).toEqual('Password is too short!')
            })

            test('undefined, the user should be rejected', async () => {
                const newUser = {
                    ...testData.newUser,
                    password: undefined,
                }
                const response = await api.post('/api/users').
                    send(newUser).
                    expect(400)
                expect(response.body.error).toEqual('Undefined password')
            })
        })

        describe('when adult field is', () => {
            test('undefined, it should be saved as true', async () => {
                const newUser = {
                    username: 'morko',
                    name: 'Mörkö',
                    password: 'salainen',
                }
                const response = await api.post('/api/users').
                    send(newUser).
                    expect(201)
                expect(response.body.adult).toEqual(true)
            })

            test('false, it should remain false', async () => {
                const response = await api.post('/api/users').
                    send(testData.nonAdultUser).
                    expect(201)
                expect(response.body.adult).toEqual(false)
            })

            test('a string of something, it should be rejected', async () => {
                const newUser = {
                    ...testData.newUser,
                    adult: 'something',
                }
                const response = await api.post('/api/users').
                    send(newUser).
                    expect(400)
                expect(response.body.error).toEqual('Validation error!')
            })
        })
    })
})

afterAll(async () => {
    await helper.resetDatabase(testData.users, testData.blogs)
    server.close()
})