import { connect } from 'react-redux';
import React, { Component } from 'react';

import deviceCardStyles from './deviceCard.css';
import Button from 'mtk-ui/lib/Button';
import Hr from 'mtk-ui/lib/Hr';
import MiMoreVert from 'mtk-icon/lib/MiMoreVert';

import productBanner from '../prototypes/productBanner.png';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';
import { default as withState } from 'recompose/withState';
import { default as withHandlers } from 'recompose/withHandlers';

import { browserHistory } from 'react-router';

const DeviceCardLayout = ({
  deviceName,
  deviceId,
  deviceDescription,
  openDeviceDetail,
}) => {
  return (
    <div className={deviceCardStyles.base}>
      <div>
        <MiMoreVert className={deviceCardStyles.more} />
        <img src={productBanner} className={deviceCardStyles.img} />
      </div>
      <div className={deviceCardStyles.content}>
        <h3
          className={deviceCardStyles.deviceName}
        >
          {deviceName}
        </h3>
        <Hr className={deviceCardStyles.hr}/>
        <Hr />
        <Button className={deviceCardStyles.button} onClick={openDeviceDetail}>
          Detail
        </Button>
      </div>
    </div>
  );
}

export default compose(
  pure,
  withHandlers({
    openDeviceDetail: props => () => browserHistory.push('/devices/' + props.deviceId),
  }),
)(DeviceCardLayout);