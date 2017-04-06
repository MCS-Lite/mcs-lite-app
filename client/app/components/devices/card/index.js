import React from 'react';
import { Link, browserHistory } from 'react-router';
import { Heading } from 'mcs-lite-ui';
import Button from 'mtk-ui/lib/Button';
import Hr from 'mtk-ui/lib/Hr';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import { withGetMessages } from 'react-intl-inject-hoc';
import defaultBanner from 'images/banner.svg';
import messages from '../messages';
import DropdownButton from '../dropdownButton';
import EditDeviceDialog from '../../common/dialogs/editDeviceDialog';
import DeleteConfirmDialog from '../../common/dialogs/deleteConfirmDialog';

import styles from './styles.css';

const DeviceCardLayout = ({
  deviceId,
  deviceName,
  deviceDescription,
  deviceImageURL,
  prototypeId,
  version,
  source = '來源',
  openDeviceDetail,
  setSelectedMenuValue,
  selectedMenuValue,
  editDevice,
  onDeleteSubmit,
  uploadDeviceImage,
  pushToast,
  getMessages: t,
}) => (
  <div className={styles.base}>
    <DropdownButton
      className={styles.more}
      setSelectedMenuValue={setSelectedMenuValue}
    />
    <img
      src={
        deviceImageURL
        ? window.apiUrl.replace('api', 'images/') + deviceImageURL
        : defaultBanner
      }
      className={styles.img}
      alt="product"
    />
    <div className={styles.content}>
      <div>
        <Heading level={3}>{deviceName}</Heading>
        <Hr className={styles.hr} />
        {version && `${t('version')}${version}`}
        {
          source && <div>
            {t('source')}
            <Link
              to={`/prototypes/${prototypeId}`}
              className={styles.link}
            >
              {source}
            </Link>
            <Hr className={styles.hr} />
          </div>
        }
        {
            deviceDescription &&
            <div>
              {`${t('description')}${deviceDescription}`}
            </div>
          }
      </div>
      <Button className={styles.button} onClick={openDeviceDetail}>
        {t('detail')}
      </Button>
    </div>
    {
      selectedMenuValue === 'edit' &&
      <EditDeviceDialog
        deviceId={deviceId}
        deviceName={deviceName}
        deviceDescription={deviceDescription}
        setSelectedMenuValue={setSelectedMenuValue}
        editDevice={editDevice}
        uploadDeviceImage={uploadDeviceImage}
        pushToast={pushToast}
      />
    }
    {
      selectedMenuValue === 'delete' &&
      <DeleteConfirmDialog
        deviceId={deviceId}
        setSelectedMenuValue={setSelectedMenuValue}
        onDeleteSubmit={onDeleteSubmit}
      />
    }
  </div>
);

export default compose(
  pure,
  withGetMessages(messages, 'Devices'),
  withState('selectedMenuValue', 'setSelectedMenuValue', 'none'),
  withHandlers({
    openDeviceDetail: props => () => browserHistory.push(`/devices/${props.deviceId}`),
    onDeleteSubmit: props => () => {
      props.deleteDevice(props.deviceId)
        .then(() => props.retrieveDeviceList());
      props.setSelectedMenuValue('none');
    },
  }),
)(DeviceCardLayout);
