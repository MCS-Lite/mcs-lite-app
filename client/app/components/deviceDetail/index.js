import React, { Component } from 'react';

import Footer from '../footer';
import Header from '../header';

import Breadcrumb from './breadcrumb';
import PanelHeader from './panelHeader';
import DeviceDetailHeader from './deviceDetailHeader';
import DeviceDetailInfo from './deviceDetailInfo';

import styles from './deviceDetail.css';

const DeviceDetail = ({ devices, editDevice, deleteDevice }) => {
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
  } = devices.deviceDetail;

  return (
    <div>
      <Header
        imageUrl='http://img.mediatek.com/150/mtk.linkit/profile/3492e14e-f0fb-4718-a9a7-a49e95d8cb30.jpeg'/>
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
        <PanelHeader />
      </div>
      <Footer />
    </div>
  );
}

export default DeviceDetail;
