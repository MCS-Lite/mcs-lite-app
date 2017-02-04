import React, { Component } from 'react';

import Footer from '../footer';
import Header from '@mtk/mcs-components/lib/Header';

import Breadcrumb from './breadcrumb';
import PanelHeader from './PanelHeader';
import DeviceCard from './deviceCard';

import deviceStyle from './devices.css';

const Devices = ({ devices }) => {
  return (
    <div>
      <Header />
      <div className={deviceStyle.base}>
        <Breadcrumb />
        <PanelHeader />
        <div className={deviceStyle.content}>
          {
            devices.deviceList.map((device) => {
              return (<DeviceCard {...device} />);
            })
          }
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Devices;