import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import prototypeBanner from '../../prototypes/productBanner.png';
import styles from './styles.css';
import CopyButtonGroup from '../../common/copyButtonGroup';

const DeviceDetailInfoLayout = ({
  deviceDescription,
  deviceId,
  deviceKey,
}) => {
  return (
    <div className={styles.base}>
      <div className={styles.info}>
        <img src={prototypeBanner} />
        <div>
          <FormattedMessage
            id="DeviceDetail.Description"
            defaultMessage="描述："
          />
          {deviceDescription}
        </div>
      </div>
      <div className={styles.deviceSecrets}>
        <FormattedMessage
          id="DeviceDetail.TestDeviceInfo"
          defaultMessage="您在使用 API 呼叫裝置時，將會需要 deviceId 和 deviceKey。"
        />
        <div className={styles.hint}>
          <CopyButtonGroup label="DeviceId" value={deviceId} />
          <CopyButtonGroup label="DeviceKey" value={deviceKey} />
        </div>
      </div>
    </div>
  );
}

export default DeviceDetailInfoLayout;
