import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import AppBar from 'material-ui/AppBar'
import RaisedButton from 'material-ui/RaisedButton'
import { Grid, Row, Col } from 'react-flexbox-grid/lib/index'

import { fetchAlertsIfNeeded } from '../actions/alerts'
import AlertDetail from '../components/AlertDetail'
import AlertList from '../components/AlertList'
import UserControlsContainer from '../containers/UserControlsContainer'


class App extends Component {
    static propTypes = {
        alerts: PropTypes.array.isRequired,
        isFetching: PropTypes.bool.isRequired,
        lastUpdated: PropTypes.number,
        dispatch: PropTypes.func.isRequired
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchAlertsIfNeeded())
    }

    render() {
        const { alerts, selectedAlert, data, entities } = this.props
        let alert = alerts.filter( a => a.id === selectedAlert )[0] || null
        return (
            <div className="App">
                <AppBar
                    title="ZMON"
                    iconElementRight={<UserControlsContainer />}>
                </AppBar>
                <div className="content">
                    <Grid>
                        <Row>
                        <Col xs={12} md={3}>
                            <AlertList alerts={alerts} />
                        </Col>
                        <Col xs={6} md={9}>
                            <AlertDetail alert={alert} data={data}
                                entities={entities}
                            />
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
    const { alertsReducer, selectedAlertReducer } = state

    const {
        alerts,
        data,
        entities
    } = alertsReducer || {
          alerts: [],
          data: {},
          entities: []
    }

    return {
        selectedAlert: selectedAlertReducer.selectedAlert,
        alerts,
        data,
        entities,
        isFetching: alertsReducer.isFetching,
        lastUpdated: alertsReducer.lastUpdated
    }
}

export default connect(mapStateToProps)(App)
