const supertest = require('supertest')
const {app, server} = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const testData = require('./test_data')

beforeAll(async () => {
    await Blog.remove({})
    await Blog.insertMany(testData.blogs)
})

describe('GET request on /api/blogs', () => {
    test('blogs are returned as json', async () => {
        await api.get('/api/blogs').
            expect(200).
            expect('Content-Type', /application\/json/)
    })

    test('blogs are returned in an array', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(testData.blogs.length)
        testData.blogs.forEach(blog => {
            expect(response.body).toContainEqual(blog)
        })
    })
})

describe('POST request on /api/blogs', () => {
    test('201 status code is returned as json when new item is added',
        async () => {
            await api.post('/api/blogs').
                send(testData.newItem).
                expect(201).
                expect('Content-Type', /application\/json/)
        })

    test('bloglist now contains new item', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toContainEqual(testData.newItem)
    })

    describe('When a new item', () => {
        test('has undefined likes it should have 0 likes', async () => {
            await api.post('/api/blogs').
                send(testData.newItemNoLikes).
                expect(201).
                expect('Content-Type', /application\/json/)

            const response = await api.get('/api/blogs')
            const addedItem = response.body.find(
                i => i._id === testData.newItemNoLikes._id)
            expect(addedItem.likes).toEqual(0)
        })

        test('has undefined title it should respond with code 400',
            async () => {
                await api.post('/api/blogs').
                    send(testData.newItemNoTitle).
                    expect(400)
            })

        test('has undefined url it should respond with code 400', async () => {
            await api.post('/api/blogs').send(testData.newItemNoUrl).expect(400)
        })
    })
})

afterAll(() => {
    server.close()
})