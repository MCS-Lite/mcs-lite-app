import { connect } from 'react-redux';
import React, { Component } from 'react';
import { compose, withState } from 'recompose';
import DeviceDetailLayout from '../components/deviceDetail';
import * as deviceDetailActions from '../actions/DeviceDetailActions';

class DeviceDetail extends Component {
  componentDidMount() {
    this.props.retrieveDevice(this.props.params.deviceId)
    .then(() => this.props.setIsInitialized(true));
  }

  render() {
    return (
      <div>
        { this.props.isInitialized && <DeviceDetailLayout {...this.props} /> }
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default compose(
  connect(mapStateToProps, deviceDetailActions),
  withState('isInitialized', 'setIsInitialized', false),
)(DeviceDetail);
