import React, { Component } from 'react';
import prototypeBanner from '../prototypes/productBanner.png';
import deviceDetailInfoStyles from './deviceDetailInfo.css';
import CopyButtonGroup from './copyButtonGroup'

const DeviceDetailInfoLayout = ({
  deviceDescription,
  deviceId,
  deviceKey,
}) => {
  return (
    <div className={deviceDetailInfoStyles.base}>
      <div className={deviceDetailInfoStyles.info}>
        <img src={prototypeBanner} />
        <div>
          <b>Status:</b> {deviceDescription}
          <br/>
          <b>Public url:</b> {deviceDescription}
        </div>
      </div>
      <div className={deviceDetailInfoStyles.testDevice}>
        <div className={deviceDetailInfoStyles.testDeviceInfo}>
          You will need the deviceId and deviceKey when calling our API to access this device
        </div>
        <div className={deviceDetailInfoStyles.hint}>
          <CopyButtonGroup label="DeviceId" value={deviceId} />
          <CopyButtonGroup label="DeviceKey" value={deviceKey} />
        </div>
      </div>
    </div>
  );
}

export default DeviceDetailInfoLayout;
