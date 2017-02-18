import { connect } from 'react-redux';
import React, { Component } from 'react';
import DevicesLayout from '../components/devices';
import {
  retrieveDeviceList,
  editDevice,
  deleteDevice,
} from '../actions/DeviceActions'

class Device extends Component {
  componentDidMount() {
    this.props.retrieveDeviceList()
  }

  render() {
    return (
      <DevicesLayout {...this.props} />
    );
  }
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps, {
  retrieveDeviceList,
  editDevice,
  deleteDevice,
})(Device);
