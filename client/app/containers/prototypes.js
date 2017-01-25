import { connect } from 'react-redux';
import React, { Component } from 'react';
import PrototypeLayout from '../components/prototypes';
import { retrievePrototypeList } from '../actions/PrototypeActions'
class Prototype extends Component {

  componentWillMount() {
    this.props.retrievePrototypeList()
  }

  render() {
    return (
      <PrototypeLayout {...this.props} />
    );
  }
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps, { retrievePrototypeList })(Prototype);