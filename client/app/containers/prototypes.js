import { connect } from 'react-redux';
import React, { Component } from 'react';
// import { detectErrorMsg } from '../actions/PrototypeActions';
import PrototypeLayout from '../components/prototypes';

class Login extends Component {
  render() {
    return (
      <PrototypeLayout {...this.props} />
    );
  }
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps, {})(Login);