import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import store from './store'
import { Provider } from 'react-redux'

let wrapper

const user = {
    username: 'testiveikko',
    name: 'Veikko Testi',
    token: 'asdasdqweqwe123434331',
}

describe('<App />', () => {
    describe('when user is not logged in', () => {
        beforeEach(() => {
            wrapper = mount(<Provider store={store}>
                <App/>
            </Provider>)
        })
        it('should show only login form', () => {
            wrapper.update()
            expect(wrapper.find('.login-form').length).toBe(1)
            expect(wrapper.find('.blog-list').length).toBe(0)
        })
    })
    describe('when user is logged in', () => {
        beforeEach(() => {
            window.localStorage.setItem('loggedUser', JSON.stringify(user))
            wrapper = mount(<Provider store={store}>
                <App/>
            </Provider>)
        })
        it('should show blog-list when user is logged in', () => {
            wrapper.update()
            expect(wrapper.find('.blog-list').length).toBe(1)
            expect(wrapper.find('.login-form').length).toBe(0)
        })
    })
})