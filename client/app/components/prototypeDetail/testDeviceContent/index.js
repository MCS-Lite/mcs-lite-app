import React from 'react';

import compose from 'recompose/compose';
import pure from 'recompose/pure';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import Table from 'mtk-ui/lib/table/Table';
import TableHeader from 'mtk-ui/lib/table/TableHeader';
import TableCell from 'mtk-ui/lib/table/TableCell';
import IconAdd from 'mcs-lite-icon/lib/IconAdd';
import { withGetMessages } from 'react-intl-inject-hoc';

import messages from '../messages';
import DeviceList from '../../dashboard/deviceList';
import CreateTestDeviceDialog from '../dialogs/createTestDevice';

import styles from './styles.css';

const TestDeviceContent = ({
  devices = [],
  getMessages: t,
  openCreateTestDevice,
  createTestDevice,
  prototypeId,
  isCreateTestDevice,
  setIsCreateTestDevice,
  deleteDevice,
  retrievePrototype,
  uploadDeviceImage,
  pushToast,
}) => (
  <div className={styles.base}>
    {t('testDevices')}
    <Table className={styles.table}>
      <TableHeader>
        <TableCell>{t('deviceName')}</TableCell>
        <TableCell>{t('deviceId')}</TableCell>
        <TableCell>{t('deviceKey')}</TableCell>
        <TableCell>{t('lastDataPointTime')}</TableCell>
      </TableHeader>
      {
        devices.map(k =>
          <DeviceList
            deviceName={k.deviceName}
            deviceKey={k.deviceKey}
            deviceId={k.deviceId}
            updatedAt={k.updatedAt}
            deleteDevice={deleteDevice}
            retrievePrototype={retrievePrototype}
            prototypeId={prototypeId}
            key={`device-${k.deviceId}`}
          />,
        )
      }
    </Table>
    <a onClick={openCreateTestDevice} className={styles.link}>
      <IconAdd size={18} />
      {t('addNewTestDevice')}
    </a>
    <CreateTestDeviceDialog
      createTestDevice={createTestDevice}
      isCreateTestDevice={isCreateTestDevice}
      setIsCreateTestDevice={setIsCreateTestDevice}
      prototypeId={prototypeId}
      uploadDeviceImage={uploadDeviceImage}
      pushToast={pushToast}
    />
  </div>
);

export default compose(
  pure,
  withState('isCreateTestDevice', 'setIsCreateTestDevice', false),
  withGetMessages(messages, 'PrototypeDetail'),
  withHandlers({
    openCreateTestDevice: props => () => props.setIsCreateTestDevice(true),
  }),
)(TestDeviceContent);
