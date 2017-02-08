import React, { Component } from 'react'
import { Row, Col } from 'react-flexbox-grid'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import ReactFlot from 'react-flot'

import ApplicationItem from './ApplicationItem'

class AlertDetail extends Component {

    render() {
        let { alert, data, entities } = this.props
        let options = {
            series: {
                lines: { show: true },
                points: { show: true }
            }
        }

        const apps = entities ? [ ...new Set(entities.map(e => e.application_id)) ] : []

        const applications = (
            apps.map(app => <Col md={2} key={app}><ApplicationItem app={app}/></Col>)
        )

        const chart = data ? (
            <ReactFlot id="chart" data={data} options={options}/>
        ) : null

        return !!alert ? (
            <div>
                <Row>
                    <Col md={6}>
                        <h1>{"Alert " + alert.id}</h1>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        {applications}
                    </Col>
                    <Col md={6}>
                        <Card>
                            <CardHeader
                                title="Chart"
                                showExpandableButton={true}
                            />
                            <CardText>
                                {chart}
                            </CardText>
                        </Card>
                    </Col>

                </Row>
            </div>
        ) : null;
    }
}

export default AlertDetail;
