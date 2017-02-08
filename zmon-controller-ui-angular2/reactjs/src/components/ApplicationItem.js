import React, { Component } from 'react'
import { Row } from 'react-flexbox-grid'
import { Card, CardHeader, CardText } from 'material-ui/Card'

class ApplicationItem extends Component {
    render() {
        return (
            <Row>
                <Card>
                    <CardHeader title={this.props.app} />
                    <CardText>
                        <div> list </div>
                    </CardText>
                </Card>
            </Row>
        )
    }
}

export default ApplicationItem
