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
            bloggers.push({ author: blog.author, blogs: 1 })
        }
    })
    bloggers.sort((a, b) => a.blogs - b.blogs).reverse()
    return bloggers[0]
}

module.exports = {
    totalLikes,
    favoriteBlog,
    mostBlogs
}