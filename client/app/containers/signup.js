import { connect } from 'react-redux';
import { identity } from 'ramda';
import React from 'react';
import SignupLayout from '../components/signup';

const Signup = ({ ...props }) => <SignupLayout {...props} />;

const mapStateToProps = identity;

export default connect(mapStateToProps, {})(Signup);
