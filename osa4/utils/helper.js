const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const totalLikes = (blogs) => {
    return blogs.reduce(((sum, blog) => sum += blog.likes), 0)
}

const favoriteBlog = (blogs) => {
    return blogs.sort((a, b) => a.likes - b.likes)[blogs.length - 1]
}

const mostBlogs = (blogs) => {
    let bloggers = []
    blogs.forEach((blog) => {
        let blogger = bloggers.find(b => b.author === blog.author)
        if (blogger) {
            blogger.blogs += 1
        } else {
            bloggers.push({author: blog.author, blogs: 1})
        }
    })
    bloggers.sort((a, b) => a.blogs - b.blogs).reverse()
    return bloggers[0]
}

const mostLikes = (blogs) => {
    let bloggers = []
    blogs.forEach((blog) => {
        let blogger = bloggers.find(b => b.author === blog.author)
        if (blogger) {
            blogger.votes += blog.likes
        } else {
            bloggers.push({author: blog.author, votes: blog.likes})
        }
    })
    bloggers.sort((a, b) => a.votes - b.votes).reverse()
    return bloggers[0]
}

const format = (blog) => {
    return {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        id: blog._id,
        likes: blog.likes,
    }
}

const blogsInDb = async () => {
    const blogs = await Blog.find({}).
        populate('user', {username: 1, name: 1})
    return blogs.map(Blog.format)
}

const usersInDb = async () => {
    const users = await User.find({}).
        populate('blogs', {title: 1, author: 1, url: 1, likes: 1, blogs: 1})
    return users.map(User.format)
}

const findBlogInDb = async (id) => {
    const blog = await Blog.findById(id)
    return format(blog)
}

const addBlog = async (newBlog) => {
    const blog = new Blog({
        title: newBlog.title,
        author: newBlog.author,
        url: newBlog.url,
        likes: newBlog.likes,
        user: newBlog.user,
    })
    return await blog.save()
}

const nonExistingId = async () => {
    const blog = new Blog()
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const getToken = (id, username) => {
    const tokenUser = {username, id}
    return jwt.sign(tokenUser, process.env.SECRET)
}

const pickRandom = (list) => {
    return list[Math.floor(Math.random() * list.length)]
}

const randomUser = async () => {
    const users = await usersInDb()
    let user = pickRandom(users.filter(u => u.id !== undefined))
    let count = 0
    while (!user && count !== 5) {
        user = pickRandom(users)
        count++
    }
    return user
}

const addUser = async (user) => {
    const passwordHash = await bcrypt.hash(user.password, 10)
    const newUser = new User({
        username: user.username,
        name: user.name,
        passwordHash,
        adult: user.adult,
        blogs: user.blogs,
    })
    return await newUser.save()
}

const addUsers = async (users) => {
    return await Promise.all(users.map(u => addUser(u)))
}

const addBlogs = async (blogs) => {
    return await Promise.all(blogs.map(b => addBlog(b)))
}

const cleanUsers = async () => {
    await User.remove({})
}

const cleanBlogs = async () => {
    await Blog.remove({})
}

const setUsers = async (users) => {
    await cleanUsers()
    return await addUsers(users)
}

const setBlogs = async (blogs) => {
    await cleanBlogs()
    return await addBlogs(blogs)
}

const updateUser = async (user) => {
    return await User.findByIdAndUpdate({_id: user._id}, user)
}

const updateBlog = async (blog) => {
    return await Blog.findByIdAndUpdate({_id: blog._id}, blog)
}

const resetDatabase = async (users, blogs) => {
    const savedUsers = await setUsers(users)
    const savedBlogs = await setBlogs(blogs)
    await Promise.all(savedBlogs.map(async blog => {
        let user = pickRandom(savedUsers)
        blog.user = user._id
        return await updateBlog(blog)
    }))
    const updatedBlogs = await blogsInDb()
    await Promise.all(savedUsers.map(async user => {
        user.blogs = updatedBlogs.
            filter(b => b.user !== null && typeof b.user !== 'undefined').
            filter(b => b.user._id.equals(user._id)).
            map(b => b.id)
        return await updateUser(user)
    }))
}

module.exports = {
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
    blogsInDb,
    findBlogInDb,
    format,
    nonExistingId,
    addBlog,
    usersInDb,
    getToken,
    randomUser,
    pickRandom,
    resetDatabase,
}