import { connect } from 'react-redux';
import React, { Component } from 'react';
import { compose, withState } from 'recompose';
import PrototypesLayout from '../components/prototypes';
import LoadingPage from '../components/common/loadingPage';
import * as prototypeActions from '../actions/prototypeActions';
import * as toastActions from '../actions/toastActions';

class Prototype extends Component {
  componentWillMount() {
    this.props.retrievePrototypeList()
    .then(() => this.props.setIsInitialized(true));
  }

  render() {
    return (
      <div>
        { this.props.isInitialized ? <PrototypesLayout {...this.props} /> : <LoadingPage /> }
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default compose(
  connect(mapStateToProps, { ...prototypeActions, ...toastActions }),
  withState('isInitialized', 'setIsInitialized', false),
)(Prototype);
