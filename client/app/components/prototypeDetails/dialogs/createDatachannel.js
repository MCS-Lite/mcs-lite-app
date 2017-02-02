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

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';
import { default as withState } from 'recompose/withState';
import { default as withHandlers } from 'recompose/withHandlers';

const CreateDataChannelDialog = ({
  isCreateDataChannel,
  openCreateDataChannel,
  closeCreateDataChannel,
}) => {
  return (
    <Dialog
      show={isCreateDataChannel}
      size="large"
      onHide={closeCreateDataChannel}
    >
      <DialogHeader>
        <div>Add data channel</div>
      </DialogHeader>
      <DialogBody>
        123123
      </DialogBody>
    </Dialog>
  );
}

export default compose(
  pure,
  withHandlers({
    openCreateDataChannel: props => (e) => props.setIsCreateDataChannel(true),
    closeCreateDataChannel: props => (e) => props.setIsCreateDataChannel(false),
  }),
 )(CreateDataChannelDialog)