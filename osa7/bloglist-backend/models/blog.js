const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: {
        type: Number,
        default: 0,
    },
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    comments: [],
})

blogSchema.statics.format = (blog) => {
    return {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        id: blog._id,
        likes: blog.likes,
        user: blog.user,
        comments: blog.comments,
    }
}

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog