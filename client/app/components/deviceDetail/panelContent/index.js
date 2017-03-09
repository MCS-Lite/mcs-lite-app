import React from 'react';
import Panel from 'mtk-ui/lib/Panel';
import PanelHeader from 'mtk-ui/lib/PanelHeader';
import PanelIcon from 'mtk-ui/lib/PanelIcon';
import PanelBody from 'mtk-ui/lib/PanelBody';
import { compose, pure, withState } from 'recompose';
import { withGetMessages } from 'react-intl-inject-hoc';
import messages from '../messages';
import DataChannelContent from '../dataChannelContent';

import styles from './styles.css';

const PanelContentLayout = ({
  setSelectPanelValue,
  selectPanelValue,
  datachannels,
  deviceId,
  deviceKey,
  retrieveDatachannelDatapoint,
  datachannelDatapoints,
  getMessages: t,
}) => (
  <div className={styles.base}>
    {
      deviceId && deviceKey &&
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
            {
              (selectPanelValue === '' || selectPanelValue === 'Data channel') &&
              <DataChannelContent
                server={`ws://${window.ws}/deviceId/${deviceId}/deviceKey/${deviceKey}`}
                deviceId={deviceId}
                deviceKey={deviceKey}
                datachannels={datachannels}
                datachannelDatapoints={datachannelDatapoints}
                retrieveDatachannelDatapoint={retrieveDatachannelDatapoint}
              />
            }
          </PanelBody>
        </Panel>
    }
  </div>
);

export default compose(
  pure,
  withState('selectPanelValue', 'setSelectPanelValue', ''),
  withGetMessages(messages, 'DeviceDetail'),
)(PanelContentLayout);
