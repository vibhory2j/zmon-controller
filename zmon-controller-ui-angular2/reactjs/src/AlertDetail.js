import React, { Component } from 'react';

class AlertDetail extends Component {
    render() {
        return (
            <div className="alert-detail">
                Detail {this.props.alert.id}
            </div>
        );
    }
}

export default AlertDetail;
