import React, { Component, PropTypes } from 'react'
import { List } from 'material-ui/List'
import Alert from '../containers/Alert'

class AlertList extends Component {
    render() {
        var alerts = this.props.alerts
            .sort((a, b) => {
                let x = a.priority - b.priority
                return x === 0 ? a.id - b.id : x;
            })
            .map((alert) =>
                <Alert alert={alert} key={alert.id} />
            )

        return (
            <List>
                {alerts}
            </List>
        )
    }
}

AlertList.propTypes = {
  alerts: PropTypes.array.isRequired
}

export default AlertList;
