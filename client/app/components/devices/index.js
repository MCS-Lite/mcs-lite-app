import React, { Component } from 'react';

import Footer from '../footer';
import Header from '../header';

import Breadcrumb from './breadcrumb';
import PanelHeader from './PanelHeader';
import DeviceCard from './deviceCard';

import c from 'classnames';

import deviceStyles from './devices.css';

const Devices = ({ devices }) => {
  return (
    <div>
      <Header
        isManager
        logoutFn={()=>{}}
        nickname='evenchange4'
        numberOfCards={3}
        imageUrl='http://img.mediatek.com/150/mtk.linkit/profile/3492e14e-f0fb-4718-a9a7-a49e95d8cb30.jpeg'/>
      <div className={deviceStyles.base}>
        <Breadcrumb />
        <PanelHeader />
        <div className={deviceStyles.content}>
          {
            devices.deviceList.map((device) => {
              return (<DeviceCard {...device} key={device.deviceId} />);
            })
          }
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Devices;