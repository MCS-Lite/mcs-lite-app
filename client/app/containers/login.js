import { connect } from 'react-redux';
import R from 'ramda';
import React, { Component } from 'react';
import { detectErrorMsg } from '../actions/loginActions';
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

const mapStateToProps = R.identity;

export default connect(mapStateToProps, { detectErrorMsg })(Login);
