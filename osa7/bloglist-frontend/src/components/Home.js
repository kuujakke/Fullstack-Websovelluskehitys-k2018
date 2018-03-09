import React from 'react'
import BlogForm from './BlogForm'
import Toggleable from './Toggleable'
import BlogList from './BlogList'

const Home = ({history}) => {
    return (
        <div>
            <BlogList history={history}/>
            <Toggleable buttonLabel="Create blog"
                        ref={
                            component => this.blogForm = component}>
                <BlogForm/>
            </Toggleable>
        </div>
    )
}

export default Home