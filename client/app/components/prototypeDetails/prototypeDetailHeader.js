import { connect } from 'react-redux';
import React, { Component } from 'react';

import CreateTestDeviceDialog from './dialogs/createTestDevice';
import prototypeDetailHeaderStyles from './prototypeDetailHeader.css';

import Hr from 'mtk-ui/lib/Hr';
import Button from 'mtk-ui/lib/Button';
import Icon from 'mtk-ui/lib/Icon';
import DropdownButton from 'mtk-ui/lib/DropdownButton';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';
import { default as withState } from 'recompose/withState';
import { default as withHandlers } from 'recompose/withHandlers';

import EditPrototypeDialog from '../prototypes/dialogs/editPrototype'
import DeletePrototypeDialog from '../prototypes/dialogs/deletePrototype'
import ClonePrototypeDialog from '../prototypes/dialogs/clonePrototype'

const PrototypeDetailHeaderLayout = ({
  prototypeName,
  prototypeId,
  version,
  isCreateTestDevice,
  setIsCreateTestDevice,
  openCreateTestDevice,
  main,
  createTestDevice,
  onMoreButtonChange,
  selectMenuValue,
}) => {
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
          <DropdownButton
              onChange={onMoreButtonChange}
              items={[
                { value: 'edit', children: 'Edit' },
                { value: 'clone', children: 'Clone' },
                { value: 'delete', children: 'Delete' },
                { value: 'export', children: 'Export' },
              ]}
              buttonProps={{
                kind: 'cancel',
              }}
            >
            <div>More <Icon iconName="caret-down" /></div>
        </DropdownButton>
        { selectMenuValue === 'clone' ? <ClonePrototype clonePrototype={clonePrototype} prototypeId={prototypeId} prototypeName={prototypeName} selectMenuValue={selectMenuValue} setSelectMenuValue={setSelectMenuValue} /> : ''}
        { selectMenuValue === 'edit' ? <EditPrototype editPrototype={editPrototype} prototypeId={prototypeId} prototypeName={prototypeName} version={version} prototypeDescription={prototypeDescription} selectMenuValue={selectMenuValue} setSelectMenuValue={setSelectMenuValue} /> : ''}
        { selectMenuValue === 'delete' ? <DeletePrototype deletePrototype={deletePrototype} prototypeId={prototypeId} selectMenuValue={selectMenuValue} setSelectMenuValue={setSelectMenuValue} /> : ''}
        </div>
      </div>
      <Hr className={prototypeDetailHeaderStyles.hr} />
    </div>
  );
}

export default compose(
  pure,
  withState('isCreateTestDevice', 'setIsCreateTestDevice', false),
  withState('isMoreButton', 'setIsMoreButton', false),
  withState('selectMenuValue', 'setSelectMenuValue', ''),
  withHandlers({
    openCreateTestDevice: props => () => props.setIsCreateTestDevice(true),
    onMoreButtonChange: props => (e, value) => {
      props.setSelectMenuValue(value);
      props.setIsMoreButton(!props.isMoreButton)
    },
  }),
)(PrototypeDetailHeaderLayout);