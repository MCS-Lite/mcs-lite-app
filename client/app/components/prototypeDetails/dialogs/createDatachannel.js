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
import Hr from 'mtk-ui/lib/Hr';
import InputCheckbox from 'mtk-ui/lib/InputCheckbox';

import prototypeDetailActions from '../../../actions/prototypeDetailActions';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';
import { default as withState } from 'recompose/withState';
import { default as withHandlers } from 'recompose/withHandlers';

const CreateDataChannelDialog = ({
  isCreateDataChannel,
  closeCreateDataChannel,
  onDataChannelNameChange,
  onDataChannelIdChange,
  onDataChannelDescriptionChange,
}) => {
  return (
    <Dialog
      show={isCreateDataChannel}
      size="large"
      onHide={closeCreateDataChannel}
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
            label="Data channel name"
            value={dataChannelName}
            placeholder="Input the data channel name."
            onChange={onDataChannelNameChange}
          />
          <InputText
            required
            label="Data channel id"
            value={dataChannelName}
            placeholder="Input the data channel id."
            onChange={onDataChannelIdChange}
          />
          <InputTextarea
            label="Description"
            rows="4"
            value={testDeviceDescription}
            style={{ resize: 'none' }}
            placeholder="Input the data channel description."
            onChange={onDataChannelDescriptionChange}
          />
        </InputForm>
        <Hr />
        <InputCheckbox label="Create as public device" />
      </DialogBody>
      <DialogFooter>
        <Button kind="cancel" onClick={closeCreateDataChannel}>Cancel</Button>
        <Button kind="primary" onClick={submitCreateDataChannel}>
          Create
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default compose(
  pure,
  withState('dataChannelName', 'setDataChannelName', ''),
  withState('dataChannelId', 'setDataChannelId', ''),
  withState('dataChannelDescription', 'setDataChannelDescription', ''),
  withState('isCreateDataChannel', 'setIsCreateDataChannel', false),
  withHandlers({
    onDataChannelNameChange: props => (e) => props.setDataChannelName(e.target.value),
    onDataChannelIdChange: props => (e) => props.setDataChannelId(e.target.value),
    onDataChannelDescriptionChange: props => (e) => props.setDataChannelDescription(e.target.value),
    submitCreateDataChannel: props => (e) => {},
  }),
 )(CreateDataChannelDialog)