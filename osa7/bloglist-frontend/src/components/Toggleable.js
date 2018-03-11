import React from 'react'
import PropTypes from 'prop-types'
import { Button, Divider } from 'semantic-ui-react'

class Toggleable extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            visible: false,
        }
    }

    toggleVisibility = () => {
        this.setState({visible: !this.state.visible})
    }

    render () {
        const hideWhenVisible = {display: this.state.visible ? 'none' : ''}
        const showWhenVisible = {display: this.state.visible ? '' : 'none'}

        return (
            <div className={'toggleable'}>
                <div style={hideWhenVisible} className={'toggle-header'}>
                    <Button
                        onClick={this.toggleVisibility}
                        className={'toggle'}>{this.props.buttonLabel}</Button>
                </div>
                <div style={showWhenVisible} className={'toggle-content'}>
                    {this.props.children}
                    <Divider/>
                    <Button onClick={this.toggleVisibility}>Close</Button>
                </div>
            </div>
        )
    }
}

Toggleable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
}

export default Toggleable