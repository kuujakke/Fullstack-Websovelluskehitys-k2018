import React from 'react'
import BlogForm from './BlogForm'
import Toggleable from './Toggleable'
import BlogList from './BlogList'
import { Grid } from 'semantic-ui-react'
import Heading from './Heading'

const Blogs = ({history}) => {
    return (
        <Grid columns={3} divided>
            <Grid.Row centered>
                <Grid.Column width={14}>
                    <Heading title={'Blogs'} history={history}/>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row centered>
                <Grid.Column className={'blog-list'} width={12}>
                    <BlogList history={history}/>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row centered>
                <Toggleable buttonLabel="Create blog"
                            ref={
                                component => this.blogForm = component}>
                    <BlogForm/>
                </Toggleable>
            </Grid.Row>
        </Grid>
    )
}

export default Blogs