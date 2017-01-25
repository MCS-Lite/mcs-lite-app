import { connect } from 'react-redux';
import React, { Component } from 'react';
import { detectErrorMsg } from '../actions/LoginActions';
import LoginLayout from '../components/login';

class Login extends Component {
  componentWillMount() {
    this.props.detectErrorMsg();
  }
  render() {
    return (
      <LoginLayout {...this.props} />
    );
  }
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps, { detectErrorMsg })(Login);