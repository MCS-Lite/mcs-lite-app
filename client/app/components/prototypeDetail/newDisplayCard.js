import React, { Component } from 'react';
import newDisplayCardStyles from './newDisplayCard.css';

import Button from 'mtk-ui/lib/Button';

import SelectCreateDataChannelDialog from './dialogs/selectCreateDatachannel';
import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';
import { default as withState } from 'recompose/withState';
import { default as withHandlers } from 'recompose/withHandlers';

import { withGetMessages } from 'react-intl-inject-hoc';
import messages from './messages';

const NewDisplayCardLayout = ({
  openSelectCreateDataChannel,
  isSelectCreateDataChannel,
  setIsSelectCreateDataChannel,
  prototypeId,
  getMessages: t,
}) => {
  return (
    <div className={newDisplayCardStyles.base}>
      <p>{t('addDataChannelNow')}</p>
      <Button
        className={newDisplayCardStyles.button}
        onClick={openSelectCreateDataChannel}
      >
        {t('add')}
      </Button>
      <SelectCreateDataChannelDialog
        prototypeId={prototypeId}
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