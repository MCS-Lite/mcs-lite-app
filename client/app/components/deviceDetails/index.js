import React, { Component } from 'react';

import Footer from '../footer';
import LayoutHeader from '@mtk/mcs-components/lib/LayoutHeader';

import Breadcrumb from './breadcrumb';
import PanelHeader from './panelHeader';
import DeviceDetailHeader from './deviceDetailHeader';
import DeviceDetailInfo from './deviceDetailInfo';

import deviceDetailStyle from './deviceDetail.css';

const DeviceDetail = ({ devices }) => {
  const {
    deviceName,
    deviceDescription,
    deviceId,
  } = devices.deviceDetail;

  return (
    <div>
      <LayoutHeader
        isManager
        logoutFn={()=>{}}
        nickname='evenchange4'
        numberOfCards={3}
        imageUrl='http://img.mediatek.com/150/mtk.linkit/profile/3492e14e-f0fb-4718-a9a7-a49e95d8cb30.jpeg'>
      </LayoutHeader>
      <div className={deviceDetailStyle.base}>
        <Breadcrumb deviceName={deviceName} />
        <DeviceDetailHeader deviceId={deviceId} deviceName={deviceName} />
        <DeviceDetailInfo deviceDescription={deviceDescription} />
        <PanelHeader />
      </div>
      <Footer />
    </div>
  );
}

export default DeviceDetail;