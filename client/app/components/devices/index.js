import React from 'react';
import { FormattedMessage } from 'react-intl';

import compose from 'recompose/compose';
import pure from 'recompose/pure';
import withState from 'recompose/withState';

import Breadcrumb from './breadcrumb';
import PanelHeader from './panelHeader';
import DeviceCard from './card';

import styles from './styles.css';

const filteByName = key => ({ deviceName }) =>
  deviceName.toLowerCase().includes(key.toLowerCase());

const Devices = ({
  devices: {
    deviceList = [],
  } = {},
  editDevice,
  deleteDevice,
  filterKey,
  setFilterKey,
  pushToast,
  uploadDeviceImage,
}) => (
  <div>
    <div className={styles.base}>
      <Breadcrumb />
      <PanelHeader
        filterKey={filterKey}
        setFilterKey={setFilterKey}
      />
      <div className={styles.content}>
        {
          deviceList.length > 0 ? deviceList.filter(filteByName(filterKey)).map(device => (
            <DeviceCard
              {...device}
              key={device.deviceId}
              editDevice={editDevice}
              deleteDevice={deleteDevice}
              pushToast={pushToast}
              uploadDeviceImage={uploadDeviceImage}
            />
          )) : <div className={styles.noDevices}>
            <FormattedMessage
              id="DevicesList.NoDevices"
              defaultMessage="目前還沒有任何測試裝置"
            />
          </div>
        }
      </div>
    </div>
  </div>
);

export default compose(
  pure,
  withState('filterKey', 'setFilterKey', ''),
)(Devices);
