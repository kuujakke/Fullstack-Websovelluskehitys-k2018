import React from 'react'
import { filter } from '../reducers/filterReducer'

class Filter extends React.Component {
    handleChange = (event) => {
        this.props.store.dispatch(filter(event.target.value))
    }
    render() {
        const style = {
            marginBottom: 10
        }

        return (
            <div style={style}>
                filter <input onChange={this.handleChange} value={this.props.store.getState().filter}/>
            </div>
        )
    }
}

export default Filter