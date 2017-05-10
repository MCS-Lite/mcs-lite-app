import { connect } from 'react-redux';
import { identity } from 'ramda';
import React, { Component } from 'react';
import SignupLayout from '../components/signup';
import { detectErrorMsg } from '../actions/loginActions';

class Signup extends Component {
  componentWillMount() {
    this.props.detectErrorMsg();
  }
  render() {
    return (
      <SignupLayout {...this.props} />
    );
  }
}

const mapStateToProps = identity;

export default connect(mapStateToProps, { detectErrorMsg })(Signup);
