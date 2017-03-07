import React from 'react';
import c from 'classnames';
import Panel from 'mtk-ui/lib/Panel';
import PanelHeader from 'mtk-ui/lib/PanelHeader';
import PanelBody from 'mtk-ui/lib/PanelBody';
import PanelIcon from 'mtk-ui/lib/PanelIcon';
import IconSetting from 'mcs-lite-icon/lib/IconSetting';

import compose from 'recompose/compose';
import pure from 'recompose/pure';
import withHandlers from 'recompose/withHandlers';
import withState from 'recompose/withState';

import { withGetMessages } from 'react-intl-inject-hoc';
import messages from '../messages';

import DataChannelContent from '../dataChannelContent';
import TestDeviceContent from '../testDeviceContent';

import styles from './styles.css';

const PanelHeaderNav = pure(({ onPanelNavClick, selectPanelValue, t }) => (
  <div className={styles.panelHeaderNav}>
    <div
      onClick={onPanelNavClick('dataChannel')}
      className={c(
        styles.panelHeaderNavItem,
        selectPanelValue === 'dataChannel' && styles.panelHeaderNavItemActive,
      )}
    >
      {t('dataChannel')}
    </div>
    <div
      onClick={onPanelNavClick('testDevices')}
      className={c(
        styles.panelHeaderNavItem,
        selectPanelValue === 'testDevices' && styles.panelHeaderNavItemActive,
      )}
    >
      {t('testDevices')}
    </div>
  </div>
));

const PanelContentLayout = ({
  prototypeId,
  selectPanelValue,
  createDataChannel,
  deleteDataChannel,
  datachannels,
  devices,
  createTestDevice,
  getMessages: t,
  retrieveUnitTypes,
  createUnitTypes,
  unitTypes,
  pushToast,
  onPanelNavClick,
  deleteDevice,
  retrievePrototype,
}) => (
  <div className={styles.base}>
    <Panel>
      <PanelHeader>
        <PanelIcon icon={<IconSetting size={24} />} />
        <PanelHeaderNav
          t={t}
          selectPanelValue={selectPanelValue}
          onPanelNavClick={onPanelNavClick}
        />
      </PanelHeader>
      <PanelBody className={styles.body}>
        {
          selectPanelValue === 'dataChannel' &&
            <DataChannelContent
              datachannels={datachannels}
              createDataChannel={createDataChannel}
              deleteDataChannel={deleteDataChannel}
              prototypeId={prototypeId}
              retrieveUnitTypes={retrieveUnitTypes}
              createUnitTypes={createUnitTypes}
              unitTypes={unitTypes}
              pushToast={pushToast}
            />
        }
        {
          selectPanelValue === 'testDevices' &&
            <TestDeviceContent
              createTestDevice={createTestDevice}
              devices={devices}
              prototypeId={prototypeId}
              deleteDevice={deleteDevice}
              retrievePrototype={retrievePrototype}
            />
        }
      </PanelBody>
    </Panel>
  </div>
);

export default compose(
  pure,
  withState('selectPanelValue', 'setSelectPanelValue', 'dataChannel'),
  withHandlers({
    onPanelNavClick: props => value => () => props.setSelectPanelValue(value),
  }),
  withGetMessages(messages, 'PrototypeDetail'),
)(PanelContentLayout);
