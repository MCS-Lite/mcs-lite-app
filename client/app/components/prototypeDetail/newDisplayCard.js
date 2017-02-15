import React, { Component } from 'react';
import newDisplayCardStyles from './newDisplayCard.css';

import Button from 'mtk-ui/lib/Button';

import SelectCreateDataChannelDialog from './dialogs/selectCreateDatachannel';
import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';
import { default as withState } from 'recompose/withState';
import { default as withHandlers } from 'recompose/withHandlers';

const NewDisplayCardLayout = ({
  openSelectCreateDataChannel,
  isSelectCreateDataChannel,
  setIsSelectCreateDataChannel,
  prototypeId,
}) => {
  return (
    <div className={newDisplayCardStyles.base}>
      <p>Add Data channel now!</p>
      <Button className={newDisplayCardStyles.button} onClick={openSelectCreateDataChannel}>
        Add
      </Button>
      <SelectCreateDataChannelDialog prototypeId={prototypeId} isSelectCreateDataChannel={isSelectCreateDataChannel} setIsSelectCreateDataChannel={setIsSelectCreateDataChannel} />
    </div>
  );
}

export default compose(
  pure,
  withState('isSelectCreateDataChannel', 'setIsSelectCreateDataChannel', false),
  withHandlers({
    openSelectCreateDataChannel: props => () => props.setIsSelectCreateDataChannel(true),
  }),
)(NewDisplayCardLayout);