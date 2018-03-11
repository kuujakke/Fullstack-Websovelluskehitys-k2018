const navigationReducer = (state = {activeItem: 'blogs'}, action) => {
    switch (action.type) {
        case 'ACTIVE-ITEM':
            return { activeItem: action.activeItem }
        default:
            return state
    }
}

export const setActiveItem = (activeItem) => {
    return {type: 'ACTIVE-ITEM', activeItem}
}

export default navigationReducer