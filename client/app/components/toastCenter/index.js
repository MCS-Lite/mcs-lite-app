import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { pathOr, pipe, length } from 'ramda';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import withState from 'recompose/withState';
import lifecycle from 'recompose/lifecycle';

import { Toast } from 'mcs-lite-ui';

import styles from './styles.css';

const ToastCenter = ({ isToastShow, toast }) => (
  <div className={styles.base}>
    <ReactCSSTransitionGroup
      transitionEnterTimeout={350}
      transitionLeaveTimeout={350}
      transitionName={{
        enter: styles.transitionEnter,
        enterActive: styles.transitionEnterActive,
        leave: styles.transitionLeave,
        leaveActive: styles.transitionLeaveActive,
      }}
    >
      {
        isToastShow &&
        <Toast kind={toast.kind} className={styles.toast}>
          <div className={styles.message}>
            {toast.message}
          </div>
        </Toast>
      }
    </ReactCSSTransitionGroup>
  </div>
);

export default compose(
  pure,
  withState('isToastShow', 'setIsToastShow', false),
  withState('toast', 'setToast', {}),
  lifecycle({
    componentWillReceiveProps(nextProps) {
      const toastCount = pipe(
        pathOr([], ['toasts', 'toastList']),
        length,
      )(nextProps);

      if (toastCount > 0 && !nextProps.isToastShow) {
        const toast = pathOr({}, ['toasts', 'toastList', 0])(nextProps);
        this.props.setIsToastShow(true);
        this.props.setToast(toast);

        setTimeout(() => {
          this.props.dropToast();
          this.props.setIsToastShow(false);
        }, 3000);
      }
    },
  }),
)(ToastCenter);
