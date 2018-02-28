const filterReducer = (filter = '', action) => {
    if (action.type === 'FILTER') {
        return action.filter
    }
    return filter
}

export const setFilter = (filter) => {
    return {type: 'FILTER', filter}
}

export default filterReducer