import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import AppBar from 'material-ui/AppBar'
import RaisedButton from 'material-ui/RaisedButton'
import { Grid, Row, Col } from 'react-flexbox-grid/lib/index'

import { fetchAlertsIfNeeded } from '../actions/alerts'
import { fetchUserData } from '../actions/user'
import AlertList from '../components/AlertList'
import AlertDetail from '../components/AlertDetail'
import UserControls from '../components/UserControls'


class App extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
        alerts: PropTypes.array.isRequired,
        isFetching: PropTypes.bool.isRequired,
        lastUpdated: PropTypes.number,
        dispatch: PropTypes.func.isRequired
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchAlertsIfNeeded())
        dispatch(fetchUserData())
    }

    render() {
        const { alerts, user, selectedAlert } = this.props
        return (
            <div className="App">
                <AppBar
                    title="ZMON"
                    iconElementRight={<UserControls user={user}/>}>
                </AppBar>
                <div className="content">
                    <Grid>
                        <Row>
                        <Col xs={6} md={3}>
                            <AlertList alerts={alerts} />
                        </Col>
                        <Col xs={6} md={9}>
                            <AlertDetail alert={selectedAlert} />
                        </Col>
                        </Row>
                    </Grid>
                </div>
                <RaisedButton
                  label="Button"
                  secondary={true}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { userReducer, alertsReducer } = state

    const {
        selectedAlert,
        isFetching,
        lastUpdated,
        alerts
    } = alertsReducer || {
          isFetching: true,
          alerts: [],
          user: {}
    }

    return {
        user: userReducer.user,
        selectedAlert,
        alerts,
        isFetching,
        lastUpdated
    }
}

export default connect(mapStateToProps)(App)
