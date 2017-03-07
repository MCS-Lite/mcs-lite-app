import { connect } from 'react-redux';
import React, { Component } from 'react';
import { compose, withState } from 'recompose';
import DevicesLayout from '../components/devices';
import {
  retrieveDeviceList,
  editDevice,
  deleteDevice,
} from '../actions/DeviceActions';

class Device extends Component {
  componentDidMount() {
    this.props.retrieveDeviceList()
    .then(() => this.props.setIsInitialized(true));
  }

  render() {
    return (
      <div>
        { this.props.isInitialized && <DevicesLayout {...this.props} /> }
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default compose(
  connect(mapStateToProps, {
    retrieveDeviceList,
    editDevice,
    deleteDevice,
  }),
  withState('isInitialized', 'setIsInitialized', false),
)(Device);
