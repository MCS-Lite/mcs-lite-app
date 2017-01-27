import { connect } from 'react-redux';
import React, { Component } from 'react';
import prototypeBanner from '../prototypes/productBanner.png';
import deviceDetailInfoStyles from './deviceDetailInfo.css';

const DeviceDetailInfoLayout = ({
  deviceDescription,
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
          <ul>
            <li>deviceId: </li>
            <li>deviceKey: </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DeviceDetailInfoLayout;