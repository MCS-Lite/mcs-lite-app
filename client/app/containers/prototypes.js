import { connect } from 'react-redux';
import React, { Component } from 'react';
import { compose, withState } from 'recompose';
import PrototypesLayout from '../components/prototypes';
import * as PrototypeActions from '../actions/prototypeActions';

class Prototype extends Component {
  componentDidMount() {
    this.props.retrievePrototypeList()
    .then(() => this.props.setIsInitialized(true));
  }

  render() {
    return (
      <div>
        { this.props.isInitialized && <PrototypesLayout {...this.props} /> }
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default compose(
  connect(mapStateToProps, PrototypeActions),
  withState('isInitialized', 'setIsInitialized', false),
)(Prototype);
