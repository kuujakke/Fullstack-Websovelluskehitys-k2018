const helper = require('../utils/helper')
const testData = require('./test_data')

describe('total likes', () => {
    test('when list has only one blog equals the likes of that', () => {
        const result = helper.totalLikes(testData.listWithOneBlog)
        expect(result).toBe(5)
    })

    test('when list has many blogs equals the sum of likes', () => {
        const result = helper.totalLikes(testData.blogs)
        expect(result).toBe(36)
    })

    test('when list is empty equals to zero', () => {
        const result = helper.totalLikes(testData.emptyList)
        expect(result).toBe(0)
    })
})

describe('favorite blog', () => {
    test('returns the most liked blog', () => {
        const result = helper.favoriteBlog(testData.blogs)
        expect(result).toEqual(testData.favorite)
    })

    test('returns undefined if empty', () => {
        const result = helper.favoriteBlog(testData.emptyList)
        expect(result).toBe(undefined)
    })

    test('returns any when list has one member', () => {
        const result = helper.favoriteBlog(testData.emptyList)
        expect(result).toEqual(testData.emptyList[0])
    })
})

describe('most blogs', () => {
    test('returns the author with most blogs', () => {
        const result = helper.mostBlogs(testData.blogs)
        expect(result.author).toBe('Robert C. Martin')
        expect(result.blogs).toBe(3)
    })

    test('returns any author when list has one member', () => {
        const result = helper.mostBlogs(testData.listWithOneBlog)
        expect(result.author).toBe('Edsger W. Dijkstra')
        expect(result.blogs).toBe(1)
    })

    test('returns undefined if list empty', () => {
        const result = helper.mostBlogs(testData.emptyList)
        expect(result).toBe(undefined)
    })
})

describe('most likes', () => {
    test('returns the author with most likes', () => {
        const result = helper.mostLikes(testData.blogs)
        expect(result.author).toBe('Edsger W. Dijkstra')
        expect(result.votes).toBe(17)
    })

    test('returns any author when list has one member', () => {
        const result = helper.mostLikes(testData.listWithOneBlog)
        expect(result.author).toBe('Edsger W. Dijkstra')
        expect(result.votes).toBe(5)
    })

    test('returns undefined if list empty', () => {
        const result = helper.mostLikes(testData.emptyList)
        expect(result).toBeUndefined()
    })
})

