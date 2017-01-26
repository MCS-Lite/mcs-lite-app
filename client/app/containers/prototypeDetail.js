import { connect } from 'react-redux';
import React, { Component } from 'react';
import PrototypeDetails from '../components/prototypeDetails';
import { retrievePrototype } from '../actions/PrototypeDetailActions'
class Prototype extends Component {

  componentDidMount() {
    this.props.retrievePrototype(this.props.params.prototypeId)
  }

  render() {
    return (
      <PrototypeDetails {...this.props} />
    );
  }
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps, { retrievePrototype })(Prototype);