import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ListItem from 'material-ui/List'
import { Card, CardHeader } from 'material-ui/Card'
import AlertDetail from './AlertDetail'

class Alert extends Component {

    handleClick = () => {
        ReactDOM.render(<AlertDetail alert={this.props.alert} />, document.getElementById('alert-detail'));
    }

    render() {
        let alert = this.props.alert;
        return (
            <ListItem onClick={this.handleClick}>
                <Card>
                    <CardHeader
                        title={alert.name}
                        subtitle={alert.id + ' - ' + alert.team}
                    />
                </Card>
            </ListItem>
        );
    }
}

export default Alert;
