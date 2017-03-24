import React from 'react';
import { compose, pure } from 'recompose';
import { Heading } from 'mcs-lite-ui';
import { withGetMessages } from 'react-intl-inject-hoc';
import messages from '../messages';
import prototypeBanner from '../../prototypes/productBanner.png';

import styles from './styles.css';

const PrototypeDetailInfoLayout = (
  {
    prototypeDescription,
    prototypeImageURL,
    devicesLength,
    getMessages: t,
  }
) => (
  <div className={styles.base}>
    <div className={styles.info}>
      <img
        src={
          prototypeImageURL
            ? window.apiUrl.replace('api', 'images/') + prototypeImageURL
            : prototypeBanner
        }
        alt="banner"
      />
      <div>
        {t('description')}{prototypeDescription}
      </div>
    </div>
    <div className={styles.testDevice}>
      <div className={styles.testDeviceInfo}>
        <Heading level={1}>{devicesLength}</Heading>
        <span>{t('testDevices')}</span>
      </div>
      <div className={styles.hint}>
        {t('testDeviceHint')}
      </div>
    </div>
  </div>
);

export default compose(pure, withGetMessages(messages, 'PrototypeDetail'))(
  PrototypeDetailInfoLayout
);
