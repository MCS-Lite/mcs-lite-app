import { connect } from 'react-redux';
import React, { Component } from 'react';
import SigninLayout from '../components/signin';
// import * as PrototypeActions from '../actions/PrototypeActions'
class Signin extends Component {

  componentDidMount() {
    this.props.retrievePrototypeList()
  }

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