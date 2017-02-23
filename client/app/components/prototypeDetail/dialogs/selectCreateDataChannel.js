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

import CreateDataChannel from './createDataChannel';

import { withGetMessages } from 'react-intl-inject-hoc';
import messages from '../messages';

const CreateDataChannelDialog = ({
  closeSelectCreateDataChannel,
  setIsCreateDataChannel,
  isCreateDataChannel,
  displayCardType,
  setDisplayCardType,
  isSelectCreateDataChannel,
  setIsSelectCreateDataChannel,
  prototypeId,
  createDataChannel,
  getMessages: t,
}) => {
  return (
    <Dialog
      show={isSelectCreateDataChannel}
      size="large"
      onHide={closeSelectCreateDataChannel}
    >
      <DialogHeader>
        <div>{t('addNewDataChannel')}</div>
      </DialogHeader>
      <DialogBody className={selectCreateDataChannelStyles.content}>
        <SelectDisplayCard
          setIsCreateDataChannel={setIsCreateDataChannel}
          displayCardType={1}
          setDisplayCardType={setDisplayCardType}
          title={t('control')}
          description={t('controlHint')}
        />
        <SelectDisplayCard
          setIsCreateDataChannel={setIsCreateDataChannel}
          displayCardType={2}
          setDisplayCardType={setDisplayCardType}
          title={t('display')}
          description={t('displayHint')} />
        {
          isCreateDataChannel ?
          <CreateDataChannel
            createDataChannel={createDataChannel}
            prototypeId={prototypeId}
            displayCardType={displayCardType}
            isCreateDataChannel={isCreateDataChannel}
            setIsCreateDataChannel={setIsCreateDataChannel}
            setIsSelectCreateDataChannel={setIsSelectCreateDataChannel}
          /> :
          ''
        }
      </DialogBody>
    </Dialog>
  );
}

export default compose(
  pure,
  withState('displayCardType', 'setDisplayCardType', 0),
  withState('isCreateDataChannel', 'setIsCreateDataChannel', false),
  withHandlers({
    closeSelectCreateDataChannel: props => () => props.setIsSelectCreateDataChannel(false),
  }),
  withGetMessages(messages, 'PrototypeDetail'),
 )(CreateDataChannelDialog)