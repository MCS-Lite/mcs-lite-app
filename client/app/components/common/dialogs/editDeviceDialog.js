import React from 'react'
import { FormattedMessage } from 'react-intl'

import Button from 'mtk-ui/lib/Button';
import Dialog from 'mtk-ui/lib/Dialog';
import DialogHeader from 'mtk-ui/lib/DialogHeader';
import DialogBody from 'mtk-ui/lib/DialogBody';
import DialogFooter from 'mtk-ui/lib/DialogFooter';
import InputForm from 'mtk-ui/lib/InputForm';
import InputText from 'mtk-ui/lib/InputText';
import InputTextarea from 'mtk-ui/lib/InputTextarea';

import compose from 'recompose/compose';
import pure from 'recompose/pure';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';

import messages from './messages';
import { withGetMessages } from 'react-intl-inject-hoc';

import styles from './dialog.css'

const EditDeviceDialog = ({
  closeDialog,
  deviceName,
  deviceDescription,
  onDeviceNameChange,
  onDescriptionChange,
  onSubmit,
  getMessages: t,
}) => (
  <Dialog show onHide={closeDialog} size="large">
    <DialogHeader>
      <FormattedMessage
        id="Dialogs.EditDevice"
        defaultMessage="編輯測試裝置"
      />
    </DialogHeader>
    <DialogBody className={styles.dialogBody}>
      <InputForm>
        <InputText
          required
          value={deviceName}
          label={t('deviceNameLabel')}
          placeholder={t('deviceNamePlaceholder')}
          onChange={onDeviceNameChange}
        />
        <InputTextarea
          value={deviceDescription}
          label={t('descriptionLabel')}
          placeholder={t('descriptionPlaceholder')}
          onChange={onDescriptionChange}
          rows={5}
        />
        {/* TODO: add upload photo block */}
      </InputForm>
    </DialogBody>
    <DialogFooter>
      <Button kind="cancel" onClick={closeDialog}>
        <FormattedMessage
          id="Dialogs.Cancel"
          defaultMessage="取消"
        />
      </Button>
      <Button kind="primary" onClick={onSubmit}>
        <FormattedMessage
          id="Dialogs.Save"
          defaultMessage="儲存"
        />
      </Button>
    </DialogFooter>
  </Dialog>
)

export default compose(
  pure,
  withGetMessages(messages, 'Dialogs'),
  withState('deviceName', 'setDeviceName', props => props.deviceName),
  withState('deviceDescription', 'setDescription', props => props.deviceDescription),
  withHandlers({
    closeDialog: props => () => props.setSeletedMenuValue('none'),
    onDeviceNameChange: props => e => props.setDeviceName(e.target.value),
    onDescriptionChange: props => e => props.setDescription(e.target.value),
    onSubmit: props => () => {
      props.setSeletedMenuValue('none');
      props.editDevice(props.deviceId, {
        deviceName: props.deviceName,
        deviceDescription: props.deviceDescription,
      })
    }
  })
)(EditDeviceDialog)
