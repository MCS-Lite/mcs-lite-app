import { connect } from 'react-redux';
import React, { Component } from 'react';

import Footer from '../footer';
import Header from '@mtk/mcs-components/lib/Header';

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
      <Header />
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