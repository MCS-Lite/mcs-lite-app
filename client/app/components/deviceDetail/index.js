import React from 'react';

import Breadcrumb from './breadcrumb';
import PanelContent from './panelContent';
import DeviceDetailHeader from './header';
import DeviceDetailInfo from './info';
import Notification from './notification';

import styles from './styles.css';

const DeviceDetail = ({
  devices,
  editDevice,
  deleteDevice,
  retrieveDatachannelDatapoint,
  uploadDeviceImage,
  pushToast,
}) => {
  const {
    deviceId,
    deviceName,
    deviceDescription,
    deviceKey,
    deviceImageURL,
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
        <Notification />
        <Breadcrumb deviceName={deviceName} />
        <DeviceDetailHeader
          deviceId={deviceId}
          deviceName={deviceName}
          version={version}
          userName={userName}
          deviceDescription={deviceDescription}
          deviceImageURL={deviceImageURL}
          prototypeId={prototypeId}
          editDevice={editDevice}
          deleteDevice={deleteDevice}
          uploadDeviceImage={uploadDeviceImage}
          pushToast={pushToast}
        />
        <DeviceDetailInfo
          deviceId={deviceId}
          deviceKey={deviceKey}
          deviceDescription={deviceDescription}
          deviceImageURL={deviceImageURL}
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
