import React, { Component } from 'react';
import { DataPointAreaChart } from 'mcs-lite-ui';
import moment from 'moment';

import Footer from '../footer';
import Header from '../header';

import Breadcrumb from './breadcrumb';
import PanelContent from './panelContent';
import DeviceDetailHeader from './header';
import DeviceDetailInfo from './info';
import Graph from './graph'

import styles from './styles.css';
import DataChannelWrapper from '../dataChannelCards/common/wrapper';

const mockupGraphData = [
  { value: 5, updatedAt: new Date('2017-02-18').valueOf() },
  { value: 25, updatedAt: new Date('2017-02-19').valueOf() },
  { value: 75, updatedAt: new Date('2017-02-20').valueOf() },
  { value: 89, updatedAt: new Date('2017-02-21').valueOf() },
  { value: 23, updatedAt: new Date('2017-02-22').valueOf() },
  { value: 41, updatedAt: new Date('2017-02-23').valueOf() },
  { value: 23, updatedAt: new Date('2017-02-24').valueOf() },
]

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
    datachannels = [],
  } = devices.deviceDetail;
  console.log(datachannels);
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
        <PanelContent
          datachannels={datachannels}
        />
      </div>
      <Footer />
    </div>
  );
}

export default DeviceDetail;
