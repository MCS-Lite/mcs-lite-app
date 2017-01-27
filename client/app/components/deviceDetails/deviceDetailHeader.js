import { connect } from 'react-redux';
import React, { Component } from 'react';

import DeleteTestDevice from './dialogs/deleteTestDevice';
import deviceDetailHeaderStyles from './deviceDetailHeader.css';

import Hr from 'mtk-ui/lib/Hr';
import Button from 'mtk-ui/lib/Button';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';
import { default as withState } from 'recompose/withState';
import { default as withHandlers } from 'recompose/withHandlers';

const DeviceDetailHeaderLayout = ({
  deviceName,
  deviceId,
  isCreateTestDevice,
  setIsCreateTestDevice,
  openCreateTestDevice,
  main,
  createTestDevice,
}) => {
  // more 要換成 DropdownButton
  return (
    <div className={deviceDetailHeaderStyles.base}>
      <div className={deviceDetailHeaderStyles.content}>
        <div className={deviceDetailHeaderStyles.info}>
          <div className={deviceDetailHeaderStyles.infoHeader}>
            <h3>{deviceName}</h3><span> (ID: {deviceId}) </span>
          </div>
          <div></div>
        </div>
        <div className={deviceDetailHeaderStyles.option}>
          <Button kind="cancel" onClick={openCreateTestDevice}>
            Delete
          </Button>
          <Button>
            Back to prototype
          </Button>
        </div>
      </div>
      <Hr className={deviceDetailHeaderStyles.hr} />
    </div>
  );
}

export default compose(
  pure,
  withState('isDeleteTestDevice', 'setIsDeleteTestDevice', false),
  withHandlers({
    openDeleteTestDevice: props => () => props.setIsDeleteTestDevice(true),
  }),
)(DeviceDetailHeaderLayout);