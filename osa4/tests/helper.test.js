const listHelper = require('../utils/list_helper')
const blogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]
const favorite = blogs[2]

const emptyList = []
const listWithOneBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }
]

describe('total likes', () => {
    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('when list has many blogs equals the sum of likes', () => {
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(36)
    })

    test('when list is empty equals to zero', () => {
        const result = listHelper.totalLikes(emptyList)
        expect(result).toBe(0)
    })
})

describe('favorite blog', () => {
    test('returns the most liked blog', () => {
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual(favorite)
    })

    test('returns undefined if empty', () => {
        const result = listHelper.favoriteBlog(emptyList)
        expect(result).toBe(undefined)
    })

    test('returns any when list has one member', () => {
        const result = listHelper.favoriteBlog(emptyList)
        expect(result).toEqual(emptyList[0])
    })
})

describe('most blogs', () => {
    test('returns the author with most blogs', () => {
        const result = listHelper.mostBlogs(blogs)
        expect(result.author).toBe("Robert C. Martin")
        expect(result.blogs).toBe(3)
    })

    test('returns any author when list has one member', () => {
        const result = listHelper.mostBlogs(listWithOneBlog)
        expect(result.author).toBe("Edsger W. Dijkstra")
        expect(result.blogs).toBe(1)
    })

    test('returns undefined if list empty', () => {
        const result = listHelper.mostBlogs(emptyList)
        expect(result).toBe(undefined)
    })
})

describe('most likes', () => {
    test('returns the author with most likes', () => {
        const result = listHelper.mostLikes(blogs)
        expect(result.author).toBe("Edsger W. Dijkstra")
        expect(result.votes).toBe(17)
    })

    test('returns any author when list has one member', () => {
        const result = listHelper.mostLikes(listWithOneBlog)
        expect(result.author).toBe("Edsger W. Dijkstra")
        expect(result.votes).toBe(5)
    })

    test('returns undefined if list empty', () => {
        const result = listHelper.mostLikes(emptyList)
        expect(result).toBe(undefined)
    })
})