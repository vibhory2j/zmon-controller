import React, { Component } from 'react'
import Avatar from 'material-ui/Avatar'
import { indigo900, cyan50 } from 'material-ui/styles/colors'

class UserControls extends Component {
    render() {
        let initial = 'U'
        if (this.props.user && this.props.user.name) {
            initial = this.props.user.name[0].toUpperCase()
        }

        return (
            <Avatar color={indigo900} backgroundColor={cyan50}>{initial}</Avatar>
        )
    }
}

export default UserControls;
