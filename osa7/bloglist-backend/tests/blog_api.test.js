const supertest = require('supertest')
const {app, server} = require('../index')
const api = supertest(app)
const testData = require('./test_data')
const helper = require('../utils/helper')

describe('GET request on /api/blogs', () => {
    test('blogs are returned as json', async () => {
        await api.get('/api/blogs').
            expect(200).
            expect('Content-Type', /application\/json/)
    })

    test('blogs are returned in an array', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0]).toBeDefined()
    })

    test('blogs should have a user field populated', async () => {
        const response = await api.get('/api/blogs')
        const users = await helper.usersInDb()
        expect(users.map(u => u.username)).
            toContainEqual(helper.pickRandom(response.body).user.username)
    })
})

describe('POST request on /api/blogs', () => {
    test('a valid blog can be added', async () => {
        const user = await helper.randomUser()
        const token = helper.getToken(user.id, user.username)

        const newItem = testData.newBlog

        const blogsBefore = await helper.blogsInDb()

        const response = await api.post('/api/blogs').
            set('Authorization', `Bearer ${token}`).
            send(newItem).
            expect(201).
            expect('Content-Type', /application\/json/)
        expect(response.body.user).toEqual(user.id.toString())
        const blogsAfter = await helper.blogsInDb()

        expect(blogsAfter.length).toBe(blogsBefore.length + 1)
        expect(blogsAfter.map(b => b.title)).toContainEqual(newItem.title)
        expect(blogsAfter.map(b => b.author)).toContainEqual(newItem.author)
        expect(blogsAfter.map(b => b.url)).toContainEqual(newItem.url)
    })

    describe('When a new item', () => {
        beforeEach(async () => {
            await helper.resetDatabase(testData.users, testData.blogs)
        })
        test('has undefined likes it should have 0 likes', async () => {
            const user = await helper.randomUser()
            const token = helper.getToken(user.id, user.username)
            const response = await api.post('/api/blogs').
                set('Authorization', `Bearer ${token}`).
                send(testData.newBlogNoLikes).
                expect(201).
                expect('Content-Type', /application\/json/)
            expect(response.body.likes).toEqual(0)
        })

        test('has undefined title it should respond with code 400',
            async () => {
                const user = await helper.randomUser()
                const token = helper.getToken(user.id, user.username)

                await api.post('/api/blogs').
                    set('Authorization', `Bearer ${token}`).
                    send(testData.newBlogNoTitle).
                    expect(400)
            })

        test('has undefined url it should respond with code 400', async () => {
            const user = await helper.randomUser()
            const token = helper.getToken(user.id, user.username)

            await api.post('/api/blogs').
                set('Authorization', `Bearer ${token}`).
                send(testData.newBlogNoUrl).
                expect(400)
        })
    })
})

describe('DELETE request on /api/blogs/:id', () => {
    describe('When id is', () => {
        describe('existing blog', () => {
            test('belonging to user with valid token it can be deleted',
                async () => {
                    const user = await helper.randomUser()
                    const token = helper.getToken(user.id, user.username)
                    const response = await api.post('/api/blogs').
                        set('Authorization', `Bearer ${token}`).
                        send(testData.newBlog)
                    await api.delete(`/api/blogs/${response.body._id}`).
                        set('Authorization', `Bearer ${token}`).
                        expect(200)
                    const blogs = await helper.blogsInDb()
                    expect(blogs.map(b => b.id.toString())).
                        not.
                        toContain(response.body._id.toString())
                })

            test('not belonging to user with valid token should not be deleted',
                async () => {
                    const user = await helper.randomUser()
                    let anotherUser = await helper.randomUser()
                    while (anotherUser.username === user.username) {
                        anotherUser = await helper.randomUser()
                    }
                    const token = helper.getToken(user.id, user.username)
                    const anotherToken = helper.getToken(anotherUser.id,
                        anotherUser.username)
                    const response = await api.post('/api/blogs').
                        set('Authorization', `Bearer ${anotherToken}`).
                        send(testData.newBlog)
                    await api.delete(`/api/blogs/${response.body._id}`).
                        set('Authorization', `Bearer ${token}`).
                        expect(401)
                })
        })
        describe('non-existing blog', () => {
            test('it should respond with 404', async () => {
                const user = await helper.randomUser()
                const token = helper.getToken(user.id, user.username)
                const validNonExistingId = await helper.nonExistingId()
                await api.delete(`/api/blogs/${validNonExistingId}`).
                    set('Authorization', `Bearer ${token}`).
                    expect(404)
            })
        })
    })
})

describe('PUT request on /api/blogs/:id', () => {
    describe('When id is', () => {
        test('a existing blog it can be updated', async () => {
            const newItem = {
                ...testData.newBlog,
            }
            const item = await helper.addBlog(newItem)

            const updatedItem = {
                id: item._id,
                title: 'Elämäni eläimet',
                author: 'Sauli Niinistö',
                likes: newItem.likes + 1,
            }

            await api.put(`/api/blogs/${updatedItem.id}`).
                send(updatedItem).
                expect(200)
            const blog = await helper.findBlogInDb(updatedItem.id)
            expect(blog.title).toEqual(updatedItem.title)
            expect(blog.author).toEqual(updatedItem.author)
            expect(blog.url).toEqual(newItem.url)
            expect(blog.likes).toEqual(newItem.likes + 1)
        })

        test('a non-existing blog it responds with 404', async () => {
            const validNonExistingId = await helper.nonExistingId()
            await api.put(`/api/blogs/${validNonExistingId}`).expect(404)
        })
    })
})

afterAll(async () => {
    await helper.resetDatabase(testData.users, testData.blogs)
    server.close()
})