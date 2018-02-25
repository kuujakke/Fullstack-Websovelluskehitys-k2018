import React from 'react'

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
            <div>
                <div style={hideWhenVisible}>
                    <div onClick={this.toggleVisibility}
                         className={'toggleable'}>{this.props.buttonLabel}</div>
                </div>
                <div style={showWhenVisible} className={'toggled'}>
                    {this.props.children}
                    <button onClick={this.toggleVisibility}>Close</button>
                </div>
            </div>
        )
    }
}

export default Toggleable