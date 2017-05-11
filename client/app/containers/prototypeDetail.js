import { connect } from 'react-redux';
import { identity } from 'ramda';
import React, { Component } from 'react';
import { compose, withState } from 'recompose';
import PrototypeDetailLayout from '../components/prototypeDetail';
import LoadingPage from '../components/common/loadingPage';
import * as prototypeDetailActions from '../actions/prototypeDetailActions';
import { exportJSON, uploadPrototypeImage } from '../actions/prototypeActions';
import * as deviceActions from '../actions/deviceActions';
import { pushToast } from '../actions/toastActions';

class Prototype extends Component {
  componentWillMount() {
    this.props.retrievePrototype(this.props.params.prototypeId)
    .then(() => this.props.setIsInitialized(true));
  }

  render() {
    return (
      <div>
        { this.props.isInitialized ? <PrototypeDetailLayout {...this.props} /> : <LoadingPage /> }
      </div>
    );
  }
}

export default compose(
  connect(
    identity,
    {
      ...prototypeDetailActions,
      ...deviceActions,
      pushToast,
      uploadPrototypeImage,
      exportJSON,
    },
  ),
  withState('isInitialized', 'setIsInitialized', false),
)(Prototype);
