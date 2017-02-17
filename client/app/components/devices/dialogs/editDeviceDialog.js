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

import styles from './dialog.css'

const EditDeviceDialog = ({
  closeDialog,
  deviceName,
  deviceVersion,
  deviceDescription,
  onDeviceNameChange,
  onDeviceVersionChange,
  onDescriptionChange,
  onSubmit,
}) => (
  <Dialog show onHide={closeDialog} size="large">
    <DialogHeader>
      <FormattedMessage
        id="Devices.EditDevice"
        defaultMessage="Edit Device"
      />
    </DialogHeader>
    <DialogBody className={styles.dialogBody}>
      <InputForm>
        <InputText
          required
          value={deviceName}
          label="Device name"
          placeholder="Input the device name"
          onChange={onDeviceNameChange}
        />
        <InputText
          value={deviceVersion}
          label="Device version"
          placeholder="Input the device version"
          onChange={onDeviceVersionChange}
        />
        <InputText
          value={deviceDescription}
          label="Description"
          placeholder="Input the description"
          onChange={onDescriptionChange}
        />
        {/* TODO: add upload photo block */}
      </InputForm>
    </DialogBody>
    <DialogFooter>
      <Button kind="cancel" onClick={closeDialog}>Cancel</Button>
      <Button kind="primary" onClick={onSubmit}>
        Save
      </Button>
    </DialogFooter>
  </Dialog>
)

export default compose(
  pure,
  withState('deviceName', 'setDeviceName', props => props.deviceName),
  withState('deviceVersion', 'setDeviceVersion', props => props.deviceVersion),
  withState('deviceDescription', 'setDescription', props => props.deviceDescription),
  withHandlers({
    closeDialog: props => () => props.setSeletedMenuValue('none'),
    onDeviceNameChange: props => e => props.setDeviceName(e.target.value),
    onDeviceVersionChange: props => e => props.setDeviceVersion(e.target.value),
    onDescriptionChange: props => e => props.setDescription(e.target.value),
    onSubmit: props => () => {
      props.setSeletedMenuValue('none');
      props.editDevice(props.deviceId, {
        deviceName: props.deviceName,
        deviceVersion: props.deviceVersion,
        deviceDescription: props.deviceDescription,
      })
    }
  })
)(EditDeviceDialog)
