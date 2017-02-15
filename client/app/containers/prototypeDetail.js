import { connect } from 'react-redux';
import React, { Component } from 'react';
import PrototypeDetailLayout from '../components/prototypeDetail';
import * as prototypeDetailActions from '../actions/PrototypeDetailActions';

class Prototype extends Component {
  componentDidMount() {
    this.props.retrievePrototype(this.props.params.prototypeId)
  }

  render() {
    return (
      <PrototypeDetailLayout {...this.props} />
    );
  }
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps, prototypeDetailActions)(Prototype);