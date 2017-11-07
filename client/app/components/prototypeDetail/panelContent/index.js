import React from 'react';
import Panel from 'mtk-ui/lib/Panel';
import PanelHeader from 'mtk-ui/lib/PanelHeader';
import PanelBody from 'mtk-ui/lib/PanelBody';
import PanelIcon from 'mtk-ui/lib/PanelIcon';
import IconSetting from 'mcs-lite-icon/lib/IconSetting';
import { compose, pure, withHandlers, withState, withProps } from 'recompose';
import { withGetMessages } from 'react-intl-inject-hoc';
import messages from '../messages';
import DataChannelContent from '../dataChannelContent';
import TestDeviceContent from '../testDeviceContent';
import PanelHeaderNav from '../../common/panelHeaderNav';

import styles from './styles.css';

const PanelContentLayout = ({
  prototypeId,
  selectPanelValue,
  checkDatachannelIdAvailable,
  createDataChannel,
  deleteDataChannel,
  datachannels,
  devices,
  createTestDevice,
  retrieveUnitTypes,
  createUnitTypes,
  unitTypes,
  pushToast,
  navItems,
  onNavChange,
  deleteDevice,
  retrievePrototype,
  uploadDeviceImage,
  readOnly,
}) => (
  <div className={styles.base}>
    <Panel>
      <PanelHeader>
        <PanelIcon icon={<IconSetting size={24} />} />
        <PanelHeaderNav
          items={navItems}
          value={selectPanelValue}
          onChange={onNavChange}
        />
      </PanelHeader>
      <PanelBody className={styles.body}>
        {
          selectPanelValue === 'datachannel' &&
            <DataChannelContent
              datachannels={datachannels}
              checkDatachannelIdAvailable={checkDatachannelIdAvailable}
              createDataChannel={createDataChannel}
              deleteDataChannel={deleteDataChannel}
              prototypeId={prototypeId}
              retrieveUnitTypes={retrieveUnitTypes}
              createUnitTypes={createUnitTypes}
              unitTypes={unitTypes}
              pushToast={pushToast}
              readOnly={readOnly}
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
              uploadDeviceImage={uploadDeviceImage}
              pushToast={pushToast}
            />
        }
      </PanelBody>
    </Panel>
  </div>
);

export default compose(
  pure,
  withState('selectPanelValue', 'setSelectPanelValue', 'datachannel'),
  withHandlers({
    onNavChange: props => value => props.setSelectPanelValue(value),
  }),
  withGetMessages(messages, 'PrototypeDetail'),
  withProps(props => props.readOnly
    ? ({
      navItems: [
        { value: 'datachannel', children: props.getMessages('datachannel') },
      ],
    })
    : ({
      navItems: [
        { value: 'datachannel', children: props.getMessages('datachannel') },
        { value: 'testDevices', children: props.getMessages('testDevices') },
      ],
    }),
  ),
)(PanelContentLayout);
