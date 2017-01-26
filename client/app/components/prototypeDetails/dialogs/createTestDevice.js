import { connect } from 'react-redux';
import React, { Component } from 'react';

import Button from 'mtk-ui/lib/Button';

import Dialog from 'mtk-ui/lib/Dialog';
import DialogHeader from 'mtk-ui/lib/DialogHeader';
import DialogBody from 'mtk-ui/lib/DialogBody';
import DialogFooter from 'mtk-ui/lib/DialogFooter';
import InputForm from 'mtk-ui/lib/InputForm';
import InputText from 'mtk-ui/lib/InputText';
import InputTextarea from 'mtk-ui/lib/InputTextarea';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';
import { default as withState } from 'recompose/withState';
import { default as withHandlers } from 'recompose/withHandlers';

import { createTestDevice } from '../../../actions/PrototypeDetailActions';

const CreateTestDeviceDialog = ({
  isCreateTestDevice,
  closeCreateTestDevice,
  openCreateTestDevice,
  submitCreateTestDevice,
  onChangeTestDeviceName,
  onChangeTestDeviceDescription,
}) => {
  return (
    <Dialog
      show={isCreateTestDevice}
      size="large"
      onHide={closeCreateTestDevice}
    >
      <DialogHeader>
        <div>Create test device</div>
      </DialogHeader>
      <DialogBody>
        <InputForm
          kind="horizontal"
          style={{ backgroundColor: 'white' }}
        >
          <InputText
            required
            label="Device name"
            placeholder="Input the device name."
            onChange={onChangeTestDeviceName}
          />
          <InputTextarea
            label="Device description"
            rows="4"
            style={{ resize: 'none' }}
            placeholder="Input the device description."
            onChange={onChangeTestDeviceDescription}
          />
        </InputForm>
      </DialogBody>
      <DialogFooter>
        <Button kind="cancel" onClick={closeCreateTestDevice}>Cancel</Button>
        <Button kind="primary" onClick={submitCreateTestDevice}>
          Create
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default compose(
  pure,
  withState('testDeviceName', 'setTestDeviceName', ''),
  withState('testDeviceDescription', 'setTestDeviceDescription', ''),
  withHandlers({
    submitCreateTestDevice: props => () => {
      console.log(props);
      const data = {
        deviceName: props.testDeviceName,
        deviceDescription: props.testDeviceDescription,
        deviceImageURL: '',
        prototypeId: props.prototypeId,
      };

      createTestDevice(data)
      .then(function(data) {
        props.closeCreateTestDevice();
      });
    },
    onChangeTestDeviceName: props => (e) => props.setTestDeviceName(e.target.vallue),
    onChangeTestDeviceDescription: props => (e) => props.setTestDeviceDescription(e.target.value),
    closeCreateTestDevice: props => () => props.setIsCreateTestDevice(false),
  }),
 )(CreateTestDeviceDialog)