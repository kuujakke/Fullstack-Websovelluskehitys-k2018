import React from 'react'
import { shallow, mount } from 'enzyme'
import Blog from './Blog'
import Toggleable from './Toggleable'

describe('<Blog />', () => {

    let wrapper
    const likeHandler = jest.fn()

    const blog = {
        title: 'Testiotsikko',
        author: 'Testikirjoittaja',
        url: 'http://testi.url',
        likes: 0,
    }
    beforeEach(() => {
        wrapper = shallow(<Blog blog={blog}
                                likeHandler={likeHandler}/>)
    })
    it('should render one <Toggleable /> component', () => {
        expect(wrapper.find(Toggleable).length).toBe(1)
    })

    it('should render title and author as button label', () => {
        const toggleableDiv = wrapper.find(Toggleable)
        expect(toggleableDiv.props().buttonLabel).
            toBe(`${blog.title} ${blog.author}`)
    })

    it('should display blog-details when clicked', () => {
        wrapper = mount(<Blog blog={blog}
                                likeHandler={likeHandler}/>)
        expect(wrapper.find('.toggle-header').props().style.display).toBe('')
        expect(wrapper.find('.toggle-content').props().style.display).toBe('none')
        wrapper.find(Toggleable).find('.toggle').simulate('click')
        wrapper.update()
        expect(wrapper.find('.toggle-header').props().style.display).toBe('none')
        expect(wrapper.find('.toggle-content').props().style.display).toBe('')
        expect(wrapper.find('.toggle-content').children().at(0).props().className).toBe('blog-details')
        expect(wrapper.find('.blog-author').props().children).toBe(blog.author)
        expect(wrapper.find('.blog-title').props().children).toBe(blog.title)
        expect(wrapper.find('.blog-url').props().children).toBe(blog.url)
        expect(wrapper.find('.blog-likes').props().children[0]).toBe(blog.likes)
    })

})