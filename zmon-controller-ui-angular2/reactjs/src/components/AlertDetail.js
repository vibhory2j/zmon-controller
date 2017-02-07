import React, { Component } from 'react'
import { Row, Col } from 'react-flexbox-grid'
import ReactFlot from 'react-flot'

class AlertDetail extends Component {
    render() {
        let options = {}

        return (
            <div>
                <Row>
                    <Col md={6}>
                        Detail {this.props.alert.id}
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <ReactFlot id="chart" data={this.props.data} options={options} />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default AlertDetail;
