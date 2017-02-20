import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { FormattedMessage } from 'react-intl'

import Button from 'mtk-ui/lib/Button';
import Hr from 'mtk-ui/lib/Hr';
import MiMoreVert from 'mtk-icon/lib/MiMoreVert';

import compose from 'recompose/compose';
import pure from 'recompose/pure';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';

import productBanner from '../prototypes/productBanner.png';
import DropdownButton from './dropdownButton';
import EditDeviceDialog from '../common/dialogs/editDeviceDialog';
import DeleteDeviceDialog from '../common/dialogs/deleteDeviceDialog';

import styles from './deviceCard.css';

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
                  id="DeviceCard.Version"
                  defaultMessage="Version"
                />
                :{version}
              </h3>
            }
            {
              source && <h3>
                <FormattedMessage
                  id="DeviceCard.Source"
                  defaultMessage="Source"
                />
                :{source}
              </h3>
            }
            {
              deviceDescription &&
              <div>
                <Hr className={styles.hr}/>
                <div>
                  <FormattedMessage
                    id="DeviceCard.Description"
                    defaultMessage="Description"
                  />
                  :{deviceDescription}
                </div>
              </div>
            }
        </div>
        <Button className={styles.button} onClick={openDeviceDetail}>
          <FormattedMessage
            id="DeviceCard.Detail"
            defaultMessage="Detail"
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
        <DeleteDeviceDialog
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
