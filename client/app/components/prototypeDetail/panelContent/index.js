import React from 'react';

import Panel from 'mtk-ui/lib/Panel';
import PanelHeader from 'mtk-ui/lib/PanelHeader';
import PanelBody from 'mtk-ui/lib/PanelBody';
import PanelIcon from 'mtk-ui/lib/PanelIcon';

import compose from 'recompose/compose';
import pure from 'recompose/pure';
import withState from 'recompose/withState';

import { withGetMessages } from 'react-intl-inject-hoc';
import messages from '../messages';

import DataChannelContent from '../dataChannelContent';
import TestDeviceContent from '../testDeviceContent';

import styles from './styles.css';

const PanelContentLayout = ({
  prototypeId,
  setSelectPanelValue,
  selectPanelValue,
  createDataChannel,
  datachannels,
  devices,
  createTestDevice,
  getMessages: t,
  retrieveUnitTypes,
  createUnitTypes,
  unitTypes,
}) => (
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
        {
          (selectPanelValue === '' || selectPanelValue === 'Data channel') &&
            <DataChannelContent
              datachannels={datachannels}
              createDataChannel={createDataChannel}
              prototypeId={prototypeId}
              retrieveUnitTypes={retrieveUnitTypes}
              createUnitTypes={createUnitTypes}
              unitTypes={unitTypes}
            />
        }
        { selectPanelValue === 'Test device' ? <TestDeviceContent createTestDevice={createTestDevice} devices={devices} prototypeId={prototypeId} /> : ''}
      </PanelBody>
    </Panel>
  </div>
);

export default compose(
  pure,
  withState('selectPanelValue', 'setSelectPanelValue', ''),
  withGetMessages(messages, 'PrototypeDetail'),
)(PanelContentLayout);
