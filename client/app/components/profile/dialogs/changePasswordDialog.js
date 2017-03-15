import React from 'react';

import { Button } from 'mcs-lite-ui';
import DialogHeader from 'mtk-ui/lib/DialogHeader';
import DialogBody from 'mtk-ui/lib/DialogBody';
import DialogFooter from 'mtk-ui/lib/DialogFooter';
import InputForm from 'mtk-ui/lib/InputForm';
import InputText from 'mtk-ui/lib/InputText';

import compose from 'recompose/compose';
import pure from 'recompose/pure';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';

import { withGetMessages } from 'react-intl-inject-hoc';
import messages from '../messages';
import Dialog from '../../common/dialog';

import styles from './dialog.css';

const ChangePasswordDialog = ({
  closeDialog,
  newPassword,
  onNewPasswordChange,
  confirmPassword,
  onConfirmPasswordChange,
  onBlur,
  error,
  touched,
  onSubmit,
  getMessages: t,
}) => (
  <Dialog
    show
    size="large"
    onHide={closeDialog}
  >
    <DialogHeader>
      {t('editPassword')}
    </DialogHeader>
    <DialogBody className={styles.dialogBody}>
      <InputForm>
        <InputText
          required
          value={newPassword}
          label={t('newPassword')}
          placeholder={t('newPasswordPlaceholder')}
          onChange={onNewPasswordChange}
          onBlur={onBlur('newPassword')}
          type="password"
          error={touched.newPassword && error.newPassword}
        />
        <InputText
          required
          value={confirmPassword}
          label={t('confirmPassword')}
          placeholder={t('confirmPasswordPlaceholder')}
          onChange={onConfirmPasswordChange}
          onBlur={onBlur('confirmPassword')}
          type="password"
          error={touched.confirmPassword && error.confirmPassword}
        />
      </InputForm>
    </DialogBody>
    <DialogFooter>
      <Button kind="default" onClick={closeDialog}>
        {t('cancel')}
      </Button>
      <Button kind="primary" onClick={onSubmit}>
        {t('save')}
      </Button>
    </DialogFooter>
  </Dialog>
);

export default compose(
  pure,
  withGetMessages(messages, 'Profile'),
  withState('newPassword', 'setNewPassword', ''),
  withState('confirmPassword', 'setConfirmPassword', ''),
  withState('error', 'setError', {
    newPassword: true,
    confirmPassword: true,
  }),
  withState('touched', 'setTouched', {
    newPassword: false,
    confirmPassword: false,
  }),
  withHandlers({
    closeDialog: props => () => props.setDialogShow('none'),
    onBlur: props => field => () => {
      props.setTouched({ ...props.touched, [field]: true });
    },
    onNewPasswordChange: props => (e) => {
      const newPassword = e.target.value;
      props.setNewPassword(newPassword);

      if (newPassword === '') {
        props.setError({ ...props.error, newPassword: true });
      } else if (newPassword.length < 8) {
        props.setError({ ...props.error, newPassword: props.getMessages('passwordLengthError') });
      } else {
        props.setError({ ...props.error, newPassword: false });
      }
    },
    onConfirmPasswordChange: props => (e) => {
      const confirmPassword = e.target.value;
      props.setConfirmPassword(confirmPassword);

      if (confirmPassword === '') {
        props.setError({ ...props.error, confirmPassword: true });
      } else if (confirmPassword !== props.newPassword) {
        props.setError({ ...props.error, confirmPassword: props.getMessages('confirmPasswordError') });
      } else {
        props.setError({ ...props.error, confirmPassword: false });
      }
    },
    onSubmit: props => () => {
      props.setTouched({ newPassword: true, confirmPassword: true });
      if (!(props.error.newPassword || props.error.confirmPassword)) {
        props.changePassword(props.newPassword)
          .then(() => {
            props.setDialogShow(false);
            props.pushToast({ kind: 'success', message: props.getMessages('changePasswordSuccess') });
          })
          .catch(() => props.setError({
            newPassword: true,
            confirmPassword: true,
          }));
      }
    },
  }),
)(ChangePasswordDialog);
