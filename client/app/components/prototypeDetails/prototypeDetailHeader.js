import { connect } from 'react-redux';
import React, { Component } from 'react';

import CreateTestDeviceDialog from './dialogs/createTestDevice';
import prototypeDetailHeaderStyles from './prototypeDetailHeader.css';

import Hr from 'mtk-ui/lib/Hr';
import Button from 'mtk-ui/lib/Button';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';
import { default as withState } from 'recompose/withState';
import { default as withHandlers } from 'recompose/withHandlers';

const PrototypeDetailHeaderLayout = ({
  prototypeName,
  prototypeId,
  version,
  isCreateTestDevice,
  setIsCreateTestDevice,
  openCreateTestDevice,
  main,
  createTestDevice,
}) => {
  // more 要換成 DropdownButton
  return (
    <div className={prototypeDetailHeaderStyles.base}>
      <div className={prototypeDetailHeaderStyles.content}>
        <div className={prototypeDetailHeaderStyles.info}>
          <div className={prototypeDetailHeaderStyles.infoHeader}>
            <h3>{prototypeName}</h3><span> (ID: {prototypeId}) </span>
          </div>
          <div>version: {version} </div>
        </div>
        <div className={prototypeDetailHeaderStyles.option}>
          <CreateTestDeviceDialog
            createTestDevice={createTestDevice}
            isCreateTestDevice={isCreateTestDevice}
            setIsCreateTestDevice={setIsCreateTestDevice}
            prototypeId={prototypeId}
          />
          <Button onClick={openCreateTestDevice}>
            Create test device
          </Button>
          <Button kind="cancel">
            More
          </Button>
        </div>
      </div>
      <Hr className={prototypeDetailHeaderStyles.hr} />
    </div>
  );
}

export default compose(
  pure,
  withState('isCreateTestDevice', 'setIsCreateTestDevice', false),
  withHandlers({
    openCreateTestDevice: props => () => props.setIsCreateTestDevice(true),
  }),
)(PrototypeDetailHeaderLayout);