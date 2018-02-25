import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
    it('renders title, author and number of likes', () => {
        const blog = {
            title: 'Testiotsikko',
            author: 'Testikirjoittaja',
            likes: 39,
        }
        const blogComponent = shallow(<SimpleBlog blog={blog}/>)
        const nameDiv = blogComponent.find('.name')
        const likeDiv = blogComponent.find('.likes')

        expect(nameDiv.text()).toContain(blog.title)
        expect(nameDiv.text()).toContain(blog.author)
        expect(likeDiv.text()).toContain(blog.likes)
    })

    it('clicking the button twice calls the handler twice', () => {
        const blog = {
            title: 'Testiotsikko',
            author: 'Testikirjoittaja',
            likes: 39,
        }
        const mockHandler = jest.fn()

        const blogComponent = shallow(<SimpleBlog blog={blog}
                                                  onClick={mockHandler}/>)
        const button = blogComponent.find('button')
        button.simulate('click')
        button.simulate('click')

        expect(mockHandler.mock.calls.length).toBe(2)
    })
})