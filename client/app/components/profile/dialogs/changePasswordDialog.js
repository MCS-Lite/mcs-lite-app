import React from 'react'

import { Button } from 'mcs-lite-ui';
import Dialog from 'mtk-ui/lib/Dialog';
import DialogHeader from 'mtk-ui/lib/DialogHeader';
import DialogBody from 'mtk-ui/lib/DialogBody';
import DialogFooter from 'mtk-ui/lib/DialogFooter';
import InputForm from 'mtk-ui/lib/InputForm';
import InputText from 'mtk-ui/lib/InputText';

import compose from 'recompose/compose';
import pure from 'recompose/pure';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';

import messages from '../messages'
import { withGetMessages } from 'react-intl-inject-hoc';

import styles from './dialog.css'

const ChangePasswordDialog = ({
  closeDialog,
  newPassword,
  onNewPasswordChange,
  confirmPassword,
  onConfirmPasswordChange,
  onUserNameChange,
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
        />
        <InputText
          required
          value={confirmPassword}
          label={t('confirmPassword')}
          placeholder={t('confirmPasswordPlaceholder')}
          onChange={onConfirmPasswordChange}
        />
      </InputForm>
    </DialogBody>
    <DialogFooter>
      <Button kind="default" onClick={closeDialog}>
        {t('cancel')}
      </Button>
      <Button kind="primary">
        {t('save')}
      </Button>
    </DialogFooter>
  </Dialog>
)

export default compose(
  pure,
  withGetMessages(messages, 'Profile'),
  withState('newPassword', 'setNewPassword', ''),
  withState('confirmPassword', 'setConfirmPassword', ''),
  withHandlers({
    closeDialog: props => () => props.setDialogShow('none'),
    onNewPasswordChange: props => e => props.setNewPassword(e.target.value),
    onConfirmPasswordChange: props => e => props.setConfirmPassword(e.target.value),
  })
)(ChangePasswordDialog)
