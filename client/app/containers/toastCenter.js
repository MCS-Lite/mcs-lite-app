import React from 'react';
import { connect } from 'react-redux';

import compose from 'recompose/compose';
import pure from 'recompose/pure';

import { pushToast, dropToast } from '../actions/toastActions';
import ToastCenterLayout from '../components/toastCenter';

const ToastCenter = ({ ...props }) => (
  <ToastCenterLayout {...props} />
);

const mapStateToProps = ({ toasts }) => ({ toasts });

export default compose(
  connect(mapStateToProps, { pushToast, dropToast }),
  pure,
)(ToastCenter);
