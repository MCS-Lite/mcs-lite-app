import { connect } from 'react-redux';
import { identity } from 'ramda';
import React, { Component } from 'react';
import { compose, withState } from 'recompose';
import PrototypeDetailLayout from '../components/prototypeDetail';
import * as prototypeDetailActions from '../actions/PrototypeDetailActions';
import { pushToast } from '../actions/toastActions';

class Prototype extends Component {
  componentDidMount() {
    this.props.retrievePrototype(this.props.params.prototypeId)
    .then(() => this.props.setIsInitialized(true));
  }

  render() {
    return (
      <div>
        { this.props.isInitialized && <PrototypeDetailLayout {...this.props} /> }
      </div>
    );
  }
}

export default compose(
  connect(
    identity,
    {
      ...prototypeDetailActions,
      pushToast,
    },
  ),
  withState('isInitialized', 'setIsInitialized', false),
)(Prototype);
