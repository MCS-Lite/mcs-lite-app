import React, { Component } from 'react';

import Button from 'mtk-ui/lib/Button';

import Dialog from 'mtk-ui/lib/Dialog';
import DialogHeader from 'mtk-ui/lib/DialogHeader';
import DialogBody from 'mtk-ui/lib/DialogBody';
import Hr from 'mtk-ui/lib/Hr';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';
import { default as withState } from 'recompose/withState';
import { default as withHandlers } from 'recompose/withHandlers';

import SelectDisplayCard from '../selectDisplayCard';
import selectCreateDataChannelStyles from './selectCreateDataChannel.css'

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
      <DialogBody className={selectCreateDataChannelStyles.content}>
        <SelectDisplayCard title="Controller" description="The controller data channels allow you to control the status of your devices. eg, ON/OFF for a switch" />
        <SelectDisplayCard title="Display" description="The display data channels allow you to get the data from your devices." />
      </DialogBody>
    </Dialog>
  );
}

export default compose(
  pure,
  withHandlers({
    openCreateDataChannel: props => () => props.setIsCreateDataChannel(true),
    closeCreateDataChannel: props => () => props.setIsCreateDataChannel(false),
  }),
 )(CreateDataChannelDialog)