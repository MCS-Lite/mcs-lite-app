import React, { Component } from 'react';

import deviceListStyle from './deviceList.css';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';
import { default as withState } from 'recompose/withState';
import { default as withHandlers } from 'recompose/withHandlers';

import { browserHistory } from 'react-router';
import moment from 'moment';

import withGetMessages from '../../utils/withGetMessage';
import messages from './messages';
import CopyButtonGroup from '../common/copyButtonGroup';

var DeviceList = ({
  getMessages: t,
  device,
  goToDeviceDetail,
}) => {
  return (
    <TableRow>
      <TableCell><a onClick={goToDeviceDetail}>device.deviceName</a></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell>
        {moment(device.updatedAt).format()}
      </TableCell>
    </TableRow>
  );
}

export default compose(
  pure,
  withHandlers({
    goToDeviceDetail: props => () => browserHistory.push('/devices/' + props.device.deviceId),
  }),
  withGetMessages(messages, 'Dashboard'),
)(DeviceList)