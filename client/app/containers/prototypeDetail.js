import { connect } from 'react-redux';
import { identity } from 'ramda';
import React, { Component } from 'react';
import PrototypeDetailLayout from '../components/prototypeDetail';
import * as prototypeDetailActions from '../actions/PrototypeDetailActions';
import { pushToast } from '../actions/toastActions';

class Prototype extends Component {
  componentDidMount() {
    this.props.retrievePrototype(this.props.params.prototypeId);
  }

  render() {
    return (
      <PrototypeDetailLayout {...this.props} />
    );
  }
}

export default connect(
  identity,
  {
    ...prototypeDetailActions,
    pushToast,
  },
)(Prototype);
