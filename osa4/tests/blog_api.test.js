const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const testData = require('./test_data')

beforeAll(async () => {
    await Blog.remove({})

    await Blog.insertMany(testData.blogs)
})

describe('GET request on /api/blogs', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
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
    test('201 status code is returned as json when new item is added', async () => {
        await api
            .post('/api/blogs')
            .send(testData.newItem)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    })

    test('bloglist now contains new item', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toContainEqual(testData.newItem)
    })

    test('When new item has no likes it should have 0 likes', async () => {
        await api
            .post('/api/blogs')
            .send(testData.newItemNoLikes)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        const addedItem = response.body.find(i => i._id === testData.newItemNoLikes._id)
        expect(addedItem.likes).toEqual(0)
    })
})

afterAll(() => {
  server.close()
})