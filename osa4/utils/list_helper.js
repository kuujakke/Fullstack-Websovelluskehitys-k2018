const totalLikes = (blogs) => {
    return blogs.reduce(((sum, blog) => sum += blog.likes), 0)
}

const favoriteBlog = (blogs) => {
    return blogs.sort((a, b) => a.likes - b.likes)[blogs.length - 1]
}

module.exports = {
    totalLikes,
    favoriteBlog
}