import React, { Component } from 'react'
import { Row, Col } from 'react-flexbox-grid'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import ReactFlot from 'react-flot'

import ApplicationItem from './application'

class AlertDetail extends Component {
    render() {
        let { alert } = this.props
        let options = {}
        let data = []

        const applications = (
            <Col md={12}>
                <Col md={2}><ApplicationItem /></Col>
            </Col>
        )

        return !!alert ? (
            <div>
                <Row>
                    <Col md={6}>
                        <Card>
                            <CardHeader title={"Detail " + alert.id} showExpandableButton={true} />
                        </Card>
                    </Col>
                </Row>
                <Row>
                    {applications}
                </Row>
                <Row>
                    <Col md={6}>
                        <Card>
                            <CardHeader
                                title="Chart"
                                showExpandableButton={true}
                            />
                            <CardText>
                                <ReactFlot id="chart" data={data} options={options}/>
                            </CardText>
                        </Card>
                    </Col>
                </Row>
            </div>
        ) : null;
    }
}

export default AlertDetail;
