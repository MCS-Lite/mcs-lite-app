import React, { Component } from 'react';

import styles from './styles.css';
import Panel from 'mtk-ui/lib/Panel';
import PanelHeader from 'mtk-ui/lib/PanelHeader';
import PanelBody from 'mtk-ui/lib/PanelBody';
import PanelIcon from 'mtk-ui/lib/PanelIcon';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';
import { default as withState } from 'recompose/withState';

import DataChannelContent from '../dataChannelContent';
import TestDeviceContent from '../testDeviceContent';

import { withGetMessages } from 'react-intl-inject-hoc';
import messages from '../messages';

const PanelContentLayout = ({
  prototypeId,
  setSelectPanelValue,
  selectPanelValue,
  createDataChannel,
  datachannels,
  devices,
  createTestDevice,
  getMessages: t,
}) => {
  return (
    <div className={styles.base}>
      <Panel>
        <PanelHeader>
          <PanelIcon iconName="bookmark" />
          <div className={styles.content}>
            <ul>
              <li><a onClick={() => setSelectPanelValue('Data channel')}>{t('dataChannel')}</a></li>
              <li><a onClick={() => setSelectPanelValue('Test device')}>{t('testDevices')}</a></li>
            </ul>
          </div>
        </PanelHeader>
        <PanelBody className={styles.body}>
          { selectPanelValue === '' || selectPanelValue === 'Data channel' ? <DataChannelContent datachannels={datachannels} createDataChannel={createDataChannel} prototypeId={prototypeId} /> : ''}
          { selectPanelValue === 'Test device' ? <TestDeviceContent createTestDevice={createTestDevice} devices={devices} prototypeId={prototypeId} /> : ''}
        </PanelBody>
      </Panel>
    </div>
  );
}

export default compose(
  pure,
  withState('selectPanelValue', 'setSelectPanelValue', ''),
  withGetMessages(messages, 'PrototypeDetail'),
)(PanelContentLayout);