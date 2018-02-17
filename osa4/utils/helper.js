const Blog = require('../models/blog')
const User = require('../models/user')

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
        populate('blogs', {title: 1, author: 1, url: 1, likes: 1})
    return users.map(User.format)
}

const findInDb = async (id) => {
    const blog = await Blog.findById(id)
    return format(blog)
}

const saveBlog = async (newBlog) => {
    const blog = new Blog(newBlog)
    await blog.save()
}

const nonExistingId = async () => {
    const blog = new Blog()
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

module.exports = {
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
    blogsInDb,
    findInDb,
    format,
    nonExistingId,
    saveBlog,
    usersInDb,
}