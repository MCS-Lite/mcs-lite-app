import React from 'react';
import { compose, pure } from 'recompose';
import { withGetMessages } from 'react-intl-inject-hoc';
import messages from '../messages';
import prototypeBanner from '../../prototypes/productBanner.png';
import styles from './styles.css';
import CopyButtonGroup from '../../common/copyButtonGroup';

const DeviceDetailInfoLayout = ({
  deviceDescription,
  deviceId,
  deviceKey,
  getMessages: t,
}) => (
  <div className={styles.base}>
    <div className={styles.info}>
      <img src={prototypeBanner} alt="prototype" />
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
