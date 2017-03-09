import React from 'react';

import Breadcrumb from './breadcrumb';
import PanelContent from './panelContent';
import DeviceDetailHeader from './header';
import DeviceDetailInfo from './info';

import styles from './styles.css';

const DeviceDetail = ({
  devices,
  editDevice,
  deleteDevice,
  retrieveDatachannelDatapoint,
}) => {
  const {
    deviceId,
    deviceName,
    deviceDescription,
    deviceKey,
    prototype: {
      prototypeId,
      version,
    } = {},
    user: { userName } = {},
    datachannels = [],
  } = devices.deviceDetail;
  const datachannelDatapoints = devices.datachannelDatapoints[deviceId];
  return (
    <div>
      <div className={styles.base}>
        <Breadcrumb deviceName={deviceName} />
        <DeviceDetailHeader
          deviceId={deviceId}
          deviceName={deviceName}
          version={version}
          userName={userName}
          deviceDescription={deviceDescription}
          prototypeId={prototypeId}
          editDevice={editDevice}
          deleteDevice={deleteDevice}
        />
        <DeviceDetailInfo
          deviceId={deviceId}
          deviceKey={deviceKey}
          deviceDescription={deviceDescription}
        />
        <PanelContent
          deviceId={deviceId}
          deviceKey={deviceKey}
          datachannels={datachannels}
          datachannelDatapoints={datachannelDatapoints}
          retrieveDatachannelDatapoint={retrieveDatachannelDatapoint}
        />
      </div>
    </div>
  );
};

export default DeviceDetail;
