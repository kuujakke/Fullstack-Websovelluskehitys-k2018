import React from 'react'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

class Filter extends React.Component {
    handleChange = (event) => {
        this.props.setFilter(event.target.value)
    }

    render () {
        const style = {
            marginBottom: 10,
        }

        return (
            <div style={style}>
                filter <input onChange={this.handleChange}
                              value={this.props.filter}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        filter: state.filter
    }
}

const mapDispatchToProps = {
    setFilter
}

const ConnectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter)

export default ConnectedFilter