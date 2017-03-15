import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { fetchUserData } from '../actions/user'
import UserControls from '../components/UserControls'

class UserControlsContainer extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired
    }

    componentDidMount() {
        this.props.dispatch(fetchUserData())
    }

    render() {
        return React.createElement(UserControls, { user: this.props.user })
    }
}

const mapStateToProps = state => {
    const { userReducer } = state

    return {
        user: userReducer.user,
        isFetching: userReducer.isFetching
    }
}

export default connect(mapStateToProps)(UserControlsContainer)
