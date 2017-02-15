import { connect } from 'react-redux';
import React, { Component } from 'react';
import DeviceDetailLayout from '../components/deviceDetail';
import * as deviceDetailActions from '../actions/DeviceDetailActions'

class DeviceDetail extends Component {
  componentDidMount() {
    this.props.retrieveDevice(this.props.params.deviceId)
  }

  render() {
    return (
      <DeviceDetailLayout {...this.props} />
    );
  }
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps, deviceDetailActions)(DeviceDetail)