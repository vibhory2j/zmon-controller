import React, { Component } from 'react'
import { connect } from 'react-redux'
import ListItem from 'material-ui/List'
import { Card, CardHeader } from 'material-ui/Card'
import { selectTest } from '../actions/alerts'

const colors = {
    1: 'red',
    2: 'orange',
    3: 'lightgreen'
}

class Alert extends Component {
    handleClick = () =>  {
        console.log('props', this.props)
        this.props.dispatch(selectTest(this.props.alert.id.toString()))
    }

    render() {
        let alert = this.props.alert;
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
