import React, { Component } from 'react';
import newDisplayCardStyles from './newDisplayCard.css';

import Button from 'mtk-ui/lib/Button';

import CreateDataChannelDialog from './dialogs/createDatachannel';
import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';
import { default as withState } from 'recompose/withState';
import { default as withHandlers } from 'recompose/withHandlers';

const NewDisplayCardLayout = ({
  openCreateDataChannel,
  isCreateDataChannel,
  setIsCreateDataChannel,
}) => {
  return (
    <div className={newDisplayCardStyles.base}>
    <p>Add Data channel now!</p>
    <Button className={newDisplayCardStyles.button} onClick={openCreateDataChannel}>
      Add
    </Button>
    <CreateDataChannelDialog isCreateDataChannel={isCreateDataChannel} setIsCreateDataChannel={setIsCreateDataChannel} />
    </div>
  );
}

export default compose(
  pure,
  withState('isCreateDataChannel', 'setIsCreateDataChannel', false),
  withHandlers({
    openCreateDataChannel: props => () => props.setIsCreateDataChannel(true),
  }),
)(NewDisplayCardLayout);