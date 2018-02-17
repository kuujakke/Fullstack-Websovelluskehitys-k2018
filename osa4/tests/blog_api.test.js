const supertest = require('supertest')
const {app, server} = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const testData = require('./test_data')
const helper = require('../utils/helper')

beforeEach(async () => {
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
        const blogs = await helper.blogsInDb()
        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(blogs.length)
    })

    test('blogs should have a user field populated', async () => {
        const response = await api.get('/api/blogs')
        const users = await helper.usersInDb()
        response.body.forEach(b => expect(users.map(u => u.username)).
            toContainEqual(b.user.username))
    })
})

describe('POST request on /api/blogs', () => {
    test('a valid blog can be added', async () => {
        const newItem = testData.newBlog

        const blogsBefore = await helper.blogsInDb()

        await api.post('/api/blogs').
            send(newItem).
            expect(201).
            expect('Content-Type', /application\/json/)

        const blogsAfter = await helper.blogsInDb()

        expect(blogsAfter.length).toBe(blogsBefore.length + 1)
        expect(blogsAfter.map(b => b.title)).toContainEqual(newItem.title)
        expect(blogsAfter.map(b => b.author)).toContainEqual(newItem.author)
        expect(blogsAfter.map(b => b.url)).toContainEqual(newItem.url)
    })

    describe('When a new item', () => {
        test('has undefined likes it should have 0 likes', async () => {
            const response = await api.post('/api/blogs').
                send(testData.newBlogNoLikes).
                expect(201).
                expect('Content-Type', /application\/json/)
            expect(response.body.likes).toEqual(0)
        })

        test('has undefined title it should respond with code 400',
            async () => {
                await api.post('/api/blogs').
                    send(testData.newBlogNoTitle).
                    expect(400)
            })

        test('has undefined url it should respond with code 400', async () => {
            await api.post('/api/blogs').send(testData.newBlogNoUrl).expect(400)
        })
    })
})

describe('DELETE request on /api/blogs/:id', () => {
    beforeAll(async () => {
        await Blog.remove({})
        await Blog.insertMany(testData.blogs)
    })
    describe('When id is', () => {
        test('a existing blog it can be deleted', async () => {
            const newItem = testData.newBlog
            newItem._id = '5c542ba78b44a676234f17f9'
            await api.post('/api/blogs').send(newItem)
            await api.delete(`/api/blogs/${newItem._id}`).expect(200)
        })

        test('a non-existing blog it responds with 404', async () => {
            const validNonExistingId = await helper.nonExistingId()
            await api.delete(`/api/blogs/${validNonExistingId}`).expect(404)
        })
    })
})

describe('PUT request on /api/blogs/:id', () => {
    beforeAll(async () => {
        await Blog.remove({})
        await Blog.insertMany(testData.blogs)
    })
    describe('When id is', () => {
        test('a existing blog it can be updated', async () => {
            const newItem = {
                ...testData.newBlog,
                _id: '5c542ba78b48a606234f17f9',
            }
            await helper.saveBlog(newItem)

            const updatedItem = {
                id: newItem._id,
                title: 'Elämäni eläimet',
                author: 'Sauli Niinistö',
                likes: newItem.likes + 1,
            }

            await api.put(`/api/blogs/${updatedItem.id}`).
                send(updatedItem).
                expect(200)
            const blog = await helper.findInDb(updatedItem.id)
            expect(blog.title).toEqual(updatedItem.title)
            expect(blog.author).toEqual(updatedItem.author)
            expect(blog.url).toEqual(newItem.url)
            expect(blog.likes).toEqual(newItem.likes + 1)
        })

        test('a non-existing blog it responds with 404', async () => {
            const validNonExistingId = await helper.nonExistingId()
            await api.delete(`/api/blogs/${validNonExistingId}`).expect(404)
        })
    })
})

afterAll(() => {
    server.close()
})