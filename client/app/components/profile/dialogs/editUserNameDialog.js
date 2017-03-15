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

const EditUserNameDialog = ({
  closeDialog,
  userName,
  onUserNameChange,
  onSave,
  getMessages: t,
}) => (
  <Dialog
    show
    size="large"
    onHide={closeDialog}
  >
    <DialogHeader>
      {t('editUserName')}
    </DialogHeader>
    <DialogBody className={styles.dialogBody}>
      <InputForm>
        <InputText
          required
          value={userName}
          label={t('userName')}
          placeholder={t('userNamePlaceholder')}
          onChange={onUserNameChange}
        />
      </InputForm>
    </DialogBody>
    <DialogFooter>
      <Button kind="default" onClick={closeDialog}>
        {t('cancel')}
      </Button>
      <Button kind="primary" onClick={onSave}>
        {t('save')}
      </Button>
    </DialogFooter>
  </Dialog>
);

export default compose(
  pure,
  withGetMessages(messages, 'Profile'),
  withState('userName', 'setUserName', props => props.userName),
  withHandlers({
    closeDialog: props => () => props.setDialogShow('none'),
    onUserNameChange: props => e => props.setUserName(e.target.value),
    onSave: props => () => {
      props.editUserName(props.userName)
        .then(() => {
          props.pushToast({ kind: 'success', message: props.getMessages('editUserNameSuccess') });
        });
      props.setDialogShow('none');
    },
  }),
)(EditUserNameDialog);
