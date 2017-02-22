import React, { Component } from 'react';
import prototypeBanner from '../prototypes/productBanner.png';
import prototypeDetailInfoStyles from './prototypeDetailInfo.css';

import { withGetMessages } from 'react-intl-inject-hoc';
import messages from './messages';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';

const PrototypeDetailInfoLayout = ({
  prototypeDescription,
  devicesLength,
  getMessages: t,
}) => {
  return (
    <div className={prototypeDetailInfoStyles.base}>
      <div className={prototypeDetailInfoStyles.info}>
        <img src={prototypeBanner} />
        <div>
          <b>{t('description')}:</b> {prototypeDescription}
        </div>
      </div>
      <div className={prototypeDetailInfoStyles.testDevice}>
        <div className={prototypeDetailInfoStyles.testDeviceInfo}>
          <span>{devicesLength}</span>
          <p>{t('testDevices')}</p>
        </div>
        <div className={prototypeDetailInfoStyles.hint}>
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