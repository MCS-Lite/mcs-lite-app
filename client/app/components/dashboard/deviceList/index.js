import React from 'react';
import { browserHistory } from 'react-router';
import moment from 'moment';

import compose from 'recompose/compose';
import pure from 'recompose/pure';
import withHandlers from 'recompose/withHandlers';
import withState from 'recompose/withState';

import TableCell from 'mtk-ui/lib/table/TableCell';
import TableRow from 'mtk-ui/lib/table/TableRow';
import IconDelete from 'mcs-lite-icon/lib/IconDelete';
import CopyButtonGroup from '../../common/copyButtonGroup';
import DeleteConfirmDialog from '../../common/dialogs/deleteConfirmDialog';

import styles from './styles.css';

const DeviceList = ({
  deviceId,
  deviceKey,
  updatedAt,
  deviceName,
  goToDeviceDetail,
  onDeleteButtonClick,
  dialogShow,
  setDialogShow,
  onDeleteSubmit,
  deleteDevice,
}) => (
  <TableRow className={styles.base}>
    <TableCell><a className={styles.link} onClick={goToDeviceDetail}>{deviceName}</a></TableCell>
    <TableCell><CopyButtonGroup value={deviceId} /></TableCell>
    <TableCell><CopyButtonGroup value={deviceKey} /></TableCell>
    <TableCell>
      {moment(updatedAt).format('YYYY-MM-DD hh:mm')}
    </TableCell>
    {
      deleteDevice &&
        <IconDelete
          size={18}
          onClick={onDeleteButtonClick}
          className={styles.deleteButton}
        />
    }
    {
      dialogShow === 'delete' &&
        <DeleteConfirmDialog
          setSelectedMenuValue={setDialogShow}
          onDeleteSubmit={onDeleteSubmit}
        />
    }
  </TableRow>
);

export default compose(
  pure,
  withState('dialogShow', 'setDialogShow', 'none'),
  withHandlers({
    goToDeviceDetail: props => () => browserHistory.push(`/devices/${props.deviceId}`),
    onDeleteButtonClick: props => () => props.setDialogShow('delete'),
    onDeleteSubmit: props => () => {
      props.deleteDevice(props.deviceId)
        .then(() => props.retrievePrototype(props.prototypeId));
      props.setDialogShow('none');
    },
  }),
)(DeviceList);
