import React, { Component } from 'react';
import styles from './styles.css';

import Button from 'mtk-ui/lib/Button';

import SelectCreateDataChannelDialog from '../dialogs/selectCreateDatachannel';
import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';
import { default as withState } from 'recompose/withState';
import { default as withHandlers } from 'recompose/withHandlers';

import { withGetMessages } from 'react-intl-inject-hoc';
import messages from '../messages';

const NewDisplayCardLayout = ({
  openSelectCreateDataChannel,
  isSelectCreateDataChannel,
  setIsSelectCreateDataChannel,
  prototypeId,
  createDataChannel,
  getMessages: t,
}) => {
  return (
    <div className={styles.base}>
      <p>{t('addDataChannelNow')}</p>
      <Button
        className={styles.button}
        onClick={openSelectCreateDataChannel}
      >
        {t('add')}
      </Button>
      <SelectCreateDataChannelDialog
        prototypeId={prototypeId}
        createDataChannel={createDataChannel}
        isSelectCreateDataChannel={isSelectCreateDataChannel}
        setIsSelectCreateDataChannel={setIsSelectCreateDataChannel}
      />
    </div>
  );
}

export default compose(
  pure,
  withState('isSelectCreateDataChannel', 'setIsSelectCreateDataChannel', false),
  withHandlers({
    openSelectCreateDataChannel: props => () => props.setIsSelectCreateDataChannel(true),
  }),
  withGetMessages(messages, 'PrototypeDetail'),
)(NewDisplayCardLayout);