import { connect } from 'react-redux';
import React, { Component } from 'react';
import SigninLayout from '../components/signin';

class Signin extends Component {
  render() {
    return (
      <SigninLayout {...this.props} />
    );
  }
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps, {})(Signin);