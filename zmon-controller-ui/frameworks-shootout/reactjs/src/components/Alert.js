import React, { Component } from 'react'
import { connect } from 'react-redux'
import ListItem from 'material-ui/List'
import { Card, CardHeader } from 'material-ui/Card'
import { clickAlert } from '../actions/alerts'

const colors = {
    1: '#FF0000',
    2: '#FF9933',
    3: '#66FF66'
}

class Alert extends Component {
    handleClick = () =>  {
        this.props.dispatch(clickAlert(this.props.alert.id))
    }

    render() {
        let { alert } = this.props;
        let style = {
            background: colors[alert.priority]
        }
        return (
            <ListItem onClick={this.handleClick}>
                <Card style={style}>
                    <CardHeader
                        title={alert.name}
                        subtitle={alert.id + ' - ' + alert.team}
                    />
                </Card>
            </ListItem>
        );
    }
}

export default connect()(Alert)
