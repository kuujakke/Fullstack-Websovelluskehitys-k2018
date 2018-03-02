import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import {
    Container, Table, Grid, Image, Header, Form,
    Button, Message, Segment,
} from 'semantic-ui-react'

const Menu = () => {
    const activeStyle = {
        color: 'red',
    }
    const style = {
        color: 'blue',
        border: 'solid',
        fontSize: 20,
        borderRadius: 10,
        padding: 10,
        textDecoration: 'none',

    }
    return (
        <Grid.Row>
            <NavLink exact to="/" activeStyle={activeStyle}
                     style={style}>anecdotes</NavLink>&nbsp;
            <NavLink to="/create" activeStyle={activeStyle} style={style}>create
                new</NavLink>&nbsp;
            <NavLink to="/about" activeStyle={activeStyle}
                     style={style}>about</NavLink>&nbsp;
        </Grid.Row>
    )
}

const AnecdoteList = ({anecdotes}) => (
    <Grid.Row>
        <Header>Anecdotes</Header>
        <Table>
            <Table.Body>
                {anecdotes.map(
                    anecdote =>
                        <Table.Row key={anecdote.id}>
                            <Table.Cell>
                                <Link to={`/anecdotes/${anecdote.id}`}>
                                    {anecdote.content}</Link>
                            </Table.Cell>
                        </Table.Row>,
                )}
            </Table.Body>
        </Table>
    </Grid.Row>
)

const Anecdote = ({anecdote}) => (
    <Grid.Column width={12}>
        <Grid.Row>
            <Header as={'h2'}>{anecdote.content} by {anecdote.author}</Header>
        </Grid.Row>
        <Grid.Row>
            <Segment>Has {anecdote.votes} votes</Segment>
        </Grid.Row>
        <Grid.Row>
            <Segment>For more info see <a
                href={anecdote.info}>{anecdote.info}</a></Segment>
        </Grid.Row>
    </Grid.Column>
)

const About = () => (
    <Grid.Row centered={true}>
        <Grid.Column>
            <Header>About anecdote app</Header>
            <p>According to Wikipedia:</p>

            <em>An anecdote is a brief, revealing account of an individual
                person or
                an incident.
                Occasionally humorous, anecdotes differ from jokes because their
                primary purpose is not simply to provoke laughter but to reveal
                a
                truth more general than the brief tale itself,
                such as to characterize a person by delineating a specific quirk
                or
                trait, to communicate an abstract idea about a person, place, or
                thing through the concrete details of a short narrative.
                An anecdote is "a story with a point."</em>

            <p>Software engineering is full of excellent anecdotes, at this app
                you
                can find the best and add more.</p>
        </Grid.Column>
        <Grid.Column>
            <Image
                src={'https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg'}
                size={'medium'}/>
        </Grid.Column>
    </Grid.Row>
)

const Footer = () => (
    <Grid.Row>
        Anecdote app for <a
        href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack
        -sovelluskehitys</a>.

        See <a
        href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for
        the source code.
    </Grid.Row>
)

const Notification = ({message}) => {
    if (message) {
        return (
            <Message>
                <Message.Content>{message}</Message.Content>
            </Message>
        )
    }
    return null
}

class CreateNew extends React.Component {
    constructor ({history}) {
        super()
        this.state = {
            content: '',
            author: '',
            info: '',
            history: history,
        }
    }

    handleChange = (e) => {
        console.log(e.target.name, e.target.value)
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.addNew({
            content: this.state.content,
            author: this.state.author,
            info: this.state.info,
            votes: 0,
        })
        this.state.history.push('/')
    }

    render () {
        return (
            <Grid.Column>
                <Grid.Row>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field>
                            <label>content</label>
                            <input name='content' value={this.state.content}
                                   onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field>
                            <label>author</label>
                            <input name='author' value={this.state.author}
                                   onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field>
                            <label>url for more info</label>
                            <input name='info' value={this.state.info}
                                   onChange={this.handleChange}/>
                        </Form.Field>
                        <Button>create</Button>
                    </Form>
                </Grid.Row>
            </Grid.Column>
        )

    }
}

class App extends React.Component {
    constructor () {
        super()

        this.state = {
            anecdotes: [
                {
                    content: 'If it hurts, do it more often',
                    author: 'Jez Humble',
                    info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
                    votes: 0,
                    id: '1',
                },
                {
                    content: 'Premature optimization is the root of all evil',
                    author: 'Donald Knuth',
                    info: 'http://wiki.c2.com/?PrematureOptimization',
                    votes: 0,
                    id: '2',
                },
            ],
            notification: '',
        }
    }

    addNew = (anecdote) => {
        anecdote.id = (Math.random() * 10000).toFixed(0)
        this.setState({anecdotes: this.state.anecdotes.concat(anecdote)})
        this.flashNotification(`a new anecdote ${anecdote.content} created!`,
            10)
    }

    anecdoteById = (id) =>
        this.state.anecdotes.find(a => a.id === id)

    vote = (id) => {
        const anecdote = this.anecdoteById(id)

        const voted = {
            ...anecdote,
            votes: anecdote.votes + 1,
        }

        const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

        this.setState({anecdotes})
    }

    flashNotification = (notification, duration) => {
        this.setState({notification})
        setTimeout(() => {
            this.setState({notification: ''})
        }, duration * 1000)
    }

    render () {
        return (
            <Container>
                <Router>
                    <Grid columns={3} centered={true}>
                        <Grid.Row>
                            <Header size={'huge'}>Software anecdotes</Header>
                        </Grid.Row>
                        <Menu/>
                        <Notification message={this.state.notification}/>
                        <Route exact path="/" render={() => <AnecdoteList
                            anecdotes={this.state.anecdotes}/>}/>
                        <Route path="/about" render={() => <About/>}/>
                        <Route path="/create" render={({history}) => <CreateNew
                            addNew={this.addNew} history={history}/>}/>
                        <Route exact path="/anecdotes/:id"
                               render={({match}) => <Anecdote
                                   anecdote={this.anecdoteById(
                                       match.params.id)}/>}/>
                        <Footer/>
                    </Grid>
                </Router>
            </Container>
        )
    }
}

export default App
