import blogService from '../services/blogs'

const blogReducer = (store = [], action) => {
    switch (action.type) {
        case 'INIT-BLOGS':
            return [...action.data]
        case 'CREATE':
            console.log(action.blog)
            return [...store, {...action.blog}]
        case 'DESTROY':
            return store.filter(b => b.id !== action.id)
        case 'LIKE':
            const liked = store.find(b => b.id === action.id)
            const notLiked = store.filter(b => b.id !== action.id)
            return [...notLiked, {...liked, likes: liked.likes + 1}]
        case 'COMMENT':
            const blog = store.find(b => b.id === action.id)
            const notBlog = store.filter(b => b.id !== action.id)
            return [...notBlog, {...blog, comments: [...blog.comments, action.comment]}]
        default:
            return store
    }
}

export const createBlog = (blog) => {
    return async (dispatch) => {
        const newBlog = await blogService.create(blog)
        dispatch({type: 'CREATE', blog: newBlog})
        return newBlog
    }
}

export const likeBlog = (id) => {
    return async (dispatch) => {
        const blog = await findById(id)
        await blogService.update(
            {...blog, likes: blog.likes + 1})
        dispatch({type: 'LIKE', id: id})

    }
}

export const commentBlog = (id, comment) => {
    return async (dispatch) => {
        const blog = await findById(id)
        await blogService.update(
            {...blog, comments: blog.comments.concat(comment)})
        dispatch({type: 'COMMENT', id, comment})
    }
}

export const destroyBlog = (id) => {
    return async (dispatch) => {
        await blogService.destroy({id})
        dispatch({type: 'DESTROY', id})
    }
}

const findById = async (id) => {
    const blogs = await blogService.getAll()
    return blogs.find(b => b.id === id)
}

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch({type: 'INIT-BLOGS', data: blogs})
    }
}

export default blogReducer