import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import compose from 'recompose/compose';
import pure from 'recompose/pure';
import withState from 'recompose/withState';

import Footer from '../footer';
import Header from '../header';

import Breadcrumb from './breadcrumb';
import PanelHeader from './PanelHeader';
import DeviceCard from './deviceCard';

import c from 'classnames';

import styles from './devices.css';

const filteByName = key => ({ deviceName }) =>
  deviceName.toLowerCase().includes(key.toLowerCase())

const Devices = ({
  devices: {
    deviceList = [],
  } = {},
  main,
  getMessages: t,
  editDevice,
  deleteDevice,
  filterKey,
  setFilterKey,
}) => (
  <div>
    <Header
      imageUrl='http://img.mediatek.com/150/mtk.linkit/profile/3492e14e-f0fb-4718-a9a7-a49e95d8cb30.jpeg'/>
    <div className={styles.base}>
      <Breadcrumb />
      <PanelHeader setFilterKey={setFilterKey} />
      <div className={styles.content}>
        {
          deviceList.length > 0 ? deviceList.filter(filteByName(filterKey)).map((device) => (
            <DeviceCard
              {...device}
              key={device.deviceId}
              editDevice={editDevice}
              deleteDevice={deleteDevice}
            />
          )) : <div className={styles.noDevices}>
            <FormattedMessage
              id="DevicesList.NoDevices"
              defaultMessage="目前還沒有任何測試裝置"
            />
          </div>
        }
      </div>
    </div>
    <Footer />
  </div>
);

export default compose(
  pure,
  withState('filterKey', 'setFilterKey', '')
)(Devices);
