import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PrototypesLayout from '../components/prototypes';
import * as PrototypeActions from '../actions/PrototypeActions';

class Prototype extends Component {
  componentDidMount() {
    this.props.retrievePrototypeList()
  }

  render() {
    return (
      <PrototypesLayout {...this.props} />
    );
  }
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps, PrototypeActions)(Prototype);