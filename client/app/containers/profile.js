import React from 'react';
import { connect } from 'react-redux';

import compose from 'recompose/compose';
import pure from 'recompose/pure';

import { editUserName, changePassword } from '../actions/userActions';
import { pushToast } from '../actions/toastActions';
import ProfileLayout from '../components/profile';

const Profile = ({ ...props }) => (
  <ProfileLayout {...props} />
);

const mapStateToProps = ({ main }) => ({ main });

export default compose(
  connect(mapStateToProps, { editUserName, changePassword, pushToast }),
  pure,
)(Profile);
