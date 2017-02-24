import React, { Component } from 'react';
import prototypeBanner from '../../prototypes/productBanner.png';
import styles from './styles.css';

import { withGetMessages } from 'react-intl-inject-hoc';
import messages from '../messages';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';

const PrototypeDetailInfoLayout = ({
  prototypeDescription,
  devicesLength,
  getMessages: t,
}) => {
  return (
    <div className={styles.base}>
      <div className={styles.info}>
        <img src={prototypeBanner} />
        <div>
          <b>{t('description')}:</b> {prototypeDescription}
        </div>
      </div>
      <div className={styles.testDevice}>
        <div className={styles.testDeviceInfo}>
          <span>{devicesLength}</span>
          <p>{t('testDevices')}</p>
        </div>
        <div className={styles.hint}>
          {t('testDeviceHint')}
        </div>
      </div>
    </div>
  );
}

export default compose(
  pure,
  withGetMessages(messages, 'PrototypeDetail'),
)(PrototypeDetailInfoLayout);