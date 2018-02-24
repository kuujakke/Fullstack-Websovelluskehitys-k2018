const blogs = [
    {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
    },
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
    },
    {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
    },
    {
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
    },
    {
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
    },
    {
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
    },
]

const emptyList = []

const listWithOneBlog = [
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
    },
]

const favorite = blogs[2]

const newBlog = {
    title: 'Mostly Harmless',
    author: 'Douglas Adams',
    url: 'https://en.wikipedia.org/wiki/Mostly_Harmless',
    likes: 42,
}

const newBlogNoLikes = {
    title: 'The Restaurant at the End of the Universe',
    author: 'Douglas Adams',
    url: 'https://en.wikipedia.org/wiki/The_Restaurant_at_the_End_of_the_Universe',
}

const newBlogNoTitle = {
    author: 'Douglas Adams',
    url: 'https://en.wikipedia.org/wiki/The_Restaurant_at_the_End_of_the_Universe',
}

const newBlogNoUrl = {
    title: 'Life, the Universe and Everything',
    author: 'Douglas Adams',
}

const users = [
    {
        username: 'kuujakke',
        name: 'Jakke Kuukkanen',
        password: 'salainen',
        adult: true,
    },
    {
        username: 'pikmyy',
        name: 'Pikku Myy',
        password: 'salainen',
        adult: false,
    },
]

const newUser = {
    username: 'hemuli',
    name: 'Hemuli',
    password: 'salainen',
    adult: true,
}

const nonAdultUser = {
    username: 'niineit',
    name: 'Niiskuneiti',
    password: 'salainen',
    adult: false,
}

const loginUser = {
    username: 'kuujakke',
    password: 'salainen',
}

module.exports = {
    blogs,
    listWithOneBlog,
    emptyList,
    favorite,
    newBlog,
    newBlogNoLikes,
    newBlogNoTitle,
    newBlogNoUrl,
    users,
    newUser,
    nonAdultUser,
    loginUser,
}