import React, { Component } from 'react';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';
import { default as withState } from 'recompose/withState';
import { default as withHandlers } from 'recompose/withHandlers';

import { withGetMessages } from 'react-intl-inject-hoc';
import messages from './messages';

import DeviceList from '../dashboard/deviceList';

import Table from 'mtk-ui/lib/table/Table';
import TableHeader from 'mtk-ui/lib/table/TableHeader';
import TableCell from 'mtk-ui/lib/table/TableCell';
import TableRow from 'mtk-ui/lib/table/TableRow';

import CreateTestDeviceDialog from './dialogs/createTestDevice';
import styles from './testDeviceContent.css';

const TestDeviceContentLayout = ({
  devices,
  getMessages: t,
  openCreateTestDevice,
  createTestDevice,
  prototypeId,
  isCreateTestDevice,
  setIsCreateTestDevice,
}) => {
  return (
    <div style={{ width: '100%' }}>
      {t('testDevices')}
      <TableHeader style={{ marginTop: 10 }}>
        <TableCell>{t('deviceName')}</TableCell>
        <TableCell>{t('deviceId')}</TableCell>
        <TableCell>{t('deviceKey')}</TableCell>
        <TableCell>{t('lastDataPointTime')}</TableCell>
      </TableHeader>
      {
        devices.map((k, v) => {
          return (<DeviceList
            deviceName={k.deviceName}
            deviceKey={k.deviceKey}
            deviceId={k.deviceId}
            updatedAt={k.updatedAt}
          />);
        })
      }
      <a onClick={openCreateTestDevice} className={styles.link}>{t('addNewTestDevice')} </a>
      <CreateTestDeviceDialog
        createTestDevice={createTestDevice}
        isCreateTestDevice={isCreateTestDevice}
        setIsCreateTestDevice={setIsCreateTestDevice}
        prototypeId={prototypeId}
      />
    </div>
  );
}

export default compose(
  pure,
  withState('isCreateTestDevice', 'setIsCreateTestDevice', false),
  withGetMessages(messages, 'PrototypeDetail'),
  withHandlers({
    openCreateTestDevice: props => () => props.setIsCreateTestDevice(true),
  }),
)(TestDeviceContentLayout);