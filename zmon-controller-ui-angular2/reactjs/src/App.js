import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { selectAlert, fetchAlertsIfNeeded, invalidateAlert } from './actions'
import AppBar from 'material-ui/AppBar'
import Avatar from 'material-ui/Avatar'
import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import { indigo900, cyan50 } from 'material-ui/styles/colors'
import RaisedButton from 'material-ui/RaisedButton'

import AlertList from './AlertList';

const User = () => (
    <div className="user-controls">
        <Badge
            badgeContent={4}
            secondary={true}
            badgeStyle={{top:12, right:12}}>
            <NotificationsIcon />
        </Badge>
        <Avatar color={indigo900} backgroundColor={cyan50}>U</Avatar>
    </div>
)

class App extends Component {
    static propTypes = {
        selectedAlert: PropTypes.string.isRequired,
        alerts: PropTypes.array.isRequired,
        isFetching: PropTypes.bool.isRequired,
        lastUpdated: PropTypes.number,
        dispatch: PropTypes.func.isRequired
    }

    componentDidMount() {
        const { dispatch, selectedAlert } = this.props
        dispatch(fetchAlertsIfNeeded(selectedAlert))
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedAlert !== this.props.selectedAlert) {
            const { dispatch, selectedAlert } = nextProps
            dispatch(fetchAlertsIfNeeded(selectedAlert))
        }
    }

    handleChange = nextAlert => {
        this.props.dispatch(selectAlert(nextAlert))
    }

    handleRefreshClick = e => {
        e.preventDefault()

        const { dispatch, selectedAlert } = this.props
        dispatch(invalidateAlert(selectedAlert))
        dispatch(fetchAlertsIfNeeded(selectedAlert))
    }

    render() {
        const { alerts } = this.props
        return (
            <div className="App">
                <AppBar
                    title="ZMON"
                    iconElementRight={<User/>}>
                </AppBar>
                <AlertList alerts={alerts} />
                <div id="alert-detail"></div>
                <RaisedButton
                  label="Button"
                  secondary={true}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { selectedAlert, alertsByZ } = state
    const {
      isFetching,
      lastUpdated,
      items: alerts
    } = alertsByZ[selectedAlert] || {
        isFetching: true,
        items: []
    }

    return {
      selectedAlert,
      alerts,
      isFetching,
      lastUpdated
    }
}

export default connect(mapStateToProps)(App);
