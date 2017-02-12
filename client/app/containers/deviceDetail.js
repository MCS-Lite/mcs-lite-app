import { connect } from 'react-redux';
import React, { Component } from 'react';
import DeviceDetails from '../components/deviceDetails';
import * as deviceDetailActions from '../actions/DeviceDetailActions'

class DeviceDetail extends Component {

  componentDidMount() {
    this.props.retrieveDevice(this.props.params.deviceId)
  }

  render() {
    return (
      <DeviceDetails {...this.props} />
    );
  }
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps, deviceDetailActions)(DeviceDetail);