import { connect } from 'react-redux';
import React, { Component } from 'react';
import DeviceLayout from '../components/devices';
import { retrieveDeviceList } from '../actions/DeviceActions'

class Device extends Component {
  componentDidMount() {
    this.props.retrieveDeviceList()
  }

  render() {
    return (
      <DeviceLayout {...this.props} />
    );
  }
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps, { retrieveDeviceList })(Device);