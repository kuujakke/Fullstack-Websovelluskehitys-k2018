import React from 'react'
import { mount, shallow } from 'enzyme'
import App from './App'

describe('<App />', () => {
    it('should show only login when not logged in', () => {
        const wrapper = mount(<App />)
        expect(wrapper.find('.login-form').length).toBe(1)
        expect(wrapper.find('.blog-list').length).toBe(0)
    })
})