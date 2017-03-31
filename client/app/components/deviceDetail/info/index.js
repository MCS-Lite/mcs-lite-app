import React from 'react';
import { compose, pure } from 'recompose';
import { withGetMessages } from 'react-intl-inject-hoc';
import defaultBanner from 'images/banner.svg';
import messages from '../messages';
import styles from './styles.css';
import CopyButtonGroup from '../../common/copyButtonGroup';

const DeviceDetailInfoLayout = ({
  deviceDescription,
  deviceId,
  deviceKey,
  deviceImageURL,
  getMessages: t,
}) => (
  <div className={styles.base}>
    <div className={styles.info}>
      <img
        src={
          deviceImageURL
          ? window.apiUrl.replace('api', 'images/') + deviceImageURL
          : defaultBanner
        }
        alt="device"
      />
      <div>
        {t('description')}{deviceDescription}
      </div>
    </div>
    <div className={styles.deviceSecrets}>
      {t('testDeviceInfo')}
      <div className={styles.hint}>
        <CopyButtonGroup label="DeviceId" value={deviceId} />
        <CopyButtonGroup label="DeviceKey" value={deviceKey} />
      </div>
    </div>
  </div>
);

export default compose(
  pure,
  withGetMessages(messages, 'DeviceDetail'),
)(DeviceDetailInfoLayout);
