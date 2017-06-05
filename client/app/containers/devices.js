import { connect } from 'react-redux';
import React, { Component } from 'react';
import { compose, withState } from 'recompose';
import DevicesLayout from '../components/devices';
import LoadingPage from '../components/common/loadingPage';
import {
  retrieveDeviceList,
  editDevice,
  deleteDevice,
  uploadDeviceImage,
} from '../actions/deviceActions';
import { pushToast } from '../actions/toastActions';

class Device extends Component {
  componentWillMount() {
    this.props.retrieveDeviceList()
    .then(() => this.props.setIsInitialized(true));
  }

  render() {
    return (
      <div>
        { this.props.isInitialized ? <DevicesLayout {...this.props} /> : <LoadingPage /> }
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
    uploadDeviceImage,
    pushToast,
  }),
  withState('isInitialized', 'setIsInitialized', false),
)(Device);
