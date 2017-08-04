import React from 'react';
import Panel from 'mtk-ui/lib/Panel';
import PanelHeader from 'mtk-ui/lib/PanelHeader';
import PanelIcon from 'mtk-ui/lib/PanelIcon';
import PanelBody from 'mtk-ui/lib/PanelBody';
import IconSetting from 'mcs-lite-icon/lib/IconSetting';
import { compose, pure, withState, withHandlers, withProps } from 'recompose';
import { withGetMessages } from 'react-intl-inject-hoc';
import messages from '../messages';
import DataChannelContent from '../dataChannelContent';
import ApiHint from '../apiHint';
import PanelHeaderNav from '../../common/panelHeaderNav';

import styles from './styles.css';

const protocol = /https/.test(window.location.protocol) ? 'wss' : 'ws';

const PanelContentLayout = ({
  selectPanelValue,
  datachannels,
  deviceId,
  deviceKey,
  retrieveDatachannelDatapoint,
  datachannelDatapoints,
  onNavChange,
  navItems,
}) => (
  <div className={styles.base}>
    <Panel>
      <PanelHeader>
        <PanelIcon icon={<IconSetting size={24} />} />
        <PanelHeaderNav
          value={selectPanelValue}
          items={navItems}
          onChange={onNavChange}
        />
      </PanelHeader>
      <PanelBody className={styles.body}>
        {
          selectPanelValue === 'datachannel' &&
          <DataChannelContent
            server={`${protocol}://${window.ws}/deviceId/${deviceId}/deviceKey/${deviceKey}`}
            deviceId={deviceId}
            deviceKey={deviceKey}
            datachannels={datachannels}
            datachannelDatapoints={datachannelDatapoints}
            retrieveDatachannelDatapoint={retrieveDatachannelDatapoint}
          />
        }
        {
          selectPanelValue === 'apiHint' && (
            <ApiHint
              deviceId={deviceId}
              deviceKey={deviceKey}
              datachannels={datachannels}
            />
          )
        }
      </PanelBody>
    </Panel>
  </div>
);

export default compose(
  pure,
  withState('selectPanelValue', 'setSelectPanelValue', 'datachannel'),
  withGetMessages(messages, 'DeviceDetail'),
  withProps(props => ({
    navItems: [
      { value: 'datachannel', children: props.getMessages('datachannel') },
      { value: 'apiHint', children: props.getMessages('apiHint') },
    ],
  })),
  withHandlers({
    onNavChange: props => value => props.setSelectPanelValue(value),
  }),
)(PanelContentLayout);
