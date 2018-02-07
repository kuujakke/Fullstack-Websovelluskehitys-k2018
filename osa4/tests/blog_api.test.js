const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const testData = require('./initial_data')

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

afterAll(() => {
  server.close()
})