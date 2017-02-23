import React, { Component } from 'react';

import styles from './deviceList.css';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';
import { default as withState } from 'recompose/withState';
import { default as withHandlers } from 'recompose/withHandlers';

import { browserHistory } from 'react-router';
import moment from 'moment';

import { withGetMessages } from 'react-intl-inject-hoc';
import messages from './messages';
import CopyButtonGroup from '../common/copyButtonGroup';

import Table from 'mtk-ui/lib/table/Table';
import TableHeader from 'mtk-ui/lib/table/TableHeader';
import TableCell from 'mtk-ui/lib/table/TableCell';
import TableRow from 'mtk-ui/lib/table/TableRow';

var DeviceList = ({
  getMessages: t,
  device,
  deviceId,
  deviceKey,
  updatedAt,
  deviceName,
  goToDeviceDetail,
}) => {
  return (
    <TableRow>
      <TableCell><a className={styles.link} onClick={goToDeviceDetail}>{deviceName}</a></TableCell>
      <TableCell><CopyButtonGroup label="DeviceId" value={deviceId} /></TableCell>
      <TableCell><CopyButtonGroup label="DeviceKey" value={deviceKey} /></TableCell>
      <TableCell>
        {moment(updatedAt).format('YYYY-MM-DD h:mm')}
      </TableCell>
    </TableRow>
  );
}

export default compose(
  pure,
  withHandlers({
    goToDeviceDetail: props => () => browserHistory.push('/devices/' + props.deviceId),
  }),
  withGetMessages(messages, 'Dashboard'),
)(DeviceList)