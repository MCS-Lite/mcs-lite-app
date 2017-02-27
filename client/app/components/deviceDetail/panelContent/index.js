import React, { Component } from 'react';

import styles from './styles.css';
import Panel from 'mtk-ui/lib/Panel';
import PanelHeader from 'mtk-ui/lib/PanelHeader';
import PanelIcon from 'mtk-ui/lib/PanelIcon';
import PanelBody from 'mtk-ui/lib/PanelBody';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';
import { default as withState } from 'recompose/withState';

import { withGetMessages } from 'react-intl-inject-hoc';
import messages from '../messages';

import DataChannelContent from '../dataChannelContent';

const PanelContentLayout = ({
  setSelectPanelValue,
  selectPanelValue,
  datachannels,
  deviceId,
  deviceKey,
  getMessages: t,
}) => {
  return (
    <div className={styles.base}>
      {
        deviceId && deviceKey ?
          <Panel>
            <PanelHeader>
              <PanelIcon iconName="bookmark" />
              <div className={styles.content}>
                <ul>
                  <li><a onClick={() => setSelectPanelValue('Data channel')}>{t('dataChannel')}</a></li>
                </ul>
              </div>
            </PanelHeader>
            <PanelBody className={styles.body}>
              { selectPanelValue === '' || selectPanelValue === 'Data channel' ? <DataChannelContent server={"ws://localhost:8000/deviceId/" + deviceId + "/deviceKey/" + deviceKey} datachannels={datachannels} /> : ''}
            </PanelBody>
          </Panel>
        : ''
      }
    </div>
  )
};

export default compose(
  pure,
  withState('selectPanelValue', 'setSelectPanelValue', ''),
  withGetMessages(messages, 'DeviceDetail'),
)(PanelContentLayout);