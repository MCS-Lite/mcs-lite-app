import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { FormattedMessage } from 'react-intl';

import Button from 'mtk-ui/lib/Button';
import Hr from 'mtk-ui/lib/Hr';
import MiMoreVert from 'mtk-icon/lib/MiMoreVert';

import compose from 'recompose/compose';
import pure from 'recompose/pure';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';

import productBanner from '../../prototypes/productBanner.png';
import DropdownButton from '../dropdownButton';
import EditDeviceDialog from '../../common/dialogs/editDeviceDialog';
import DeleteConfirmDialog from '../../common/dialogs/deleteConfirmDialog';

import styles from './styles.css';

const DeviceCardLayout = ({
  deviceId,
  deviceName,
  deviceVersion,
  deviceDescription,
  deviceImageURL,
  version,
  source,
  templateResource,
  openDeviceDetail,
  setSeletedMenuValue,
  seletedMenuValue,
  editDevice,
  deleteDevice,
}) => {
  return (
    <div className={styles.base}>
      <DropdownButton
        className={styles.more}
        setSeletedMenuValue={setSeletedMenuValue}
      />
      <img src={deviceImageURL || productBanner} className={styles.img} />
      <div className={styles.content}>
        <div>
          <h3 className={styles.deviceName}>
            {deviceName}
          </h3>
            {
              (version || source) &&
              <Hr className={styles.hr}/>
            }
            {
              version && <h3>
                <FormattedMessage
                  id="Devices.Version"
                  defaultMessage="版本："
                />
                {version}
              </h3>
            }
            {
              source && <h3>
                <FormattedMessage
                  id="Devices.Source"
                  defaultMessage="創建來源："
                />
                {source}
              </h3>
            }
            {
              deviceDescription &&
              <div>
                <Hr className={styles.hr}/>
                <div>
                  <FormattedMessage
                    id="Devices.Description"
                    defaultMessage="描述："
                  />
                  {deviceDescription}
                </div>
              </div>
            }
        </div>
        <Button className={styles.button} onClick={openDeviceDetail}>
          <FormattedMessage
            id="Devices.Detail"
            defaultMessage="詳情"
          />
        </Button>
      </div>
      {
        seletedMenuValue === 'edit' &&
        <EditDeviceDialog
          deviceId={deviceId}
          deviceName={deviceName}
          deviceVersion={deviceVersion}
          deviceDescription={deviceDescription}
          setSeletedMenuValue={setSeletedMenuValue}
          editDevice={editDevice}
        />
      }
      {
        seletedMenuValue === 'delete' &&
        <DeleteConfirmDialog
          deviceId={deviceId}
          setSeletedMenuValue={setSeletedMenuValue}
          deleteDevice={deleteDevice}
        />
      }
    </div>
  );
}

export default compose(
  pure,
  withState('seletedMenuValue', 'setSeletedMenuValue', 'none'),
  withHandlers({
    openDeviceDetail: props => () => browserHistory.push('/devices/' + props.deviceId),
  }),
)(DeviceCardLayout);
