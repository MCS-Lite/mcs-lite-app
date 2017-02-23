import React from 'react';
import { connect } from 'react-redux';
import { editUserName } from '../actions/userActions';

import compose from 'recompose/compose';
import pure from 'recompose/pure';

import ProfileLayout from '../components/profile';

const Profile = ({ ...props }) => (
  <ProfileLayout {...props} />
)

const mapStateToProps = ({ main }) => ({ main })

export default compose(
  connect(mapStateToProps, { editUserName }),
  pure,
)(Profile)
