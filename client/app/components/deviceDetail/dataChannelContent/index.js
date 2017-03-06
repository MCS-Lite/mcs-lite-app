import React from 'react';
import {
  compose,
  pure,
  withHandlers,
  withState,
} from 'recompose';
import R from 'ramda';
import { connectSocket } from 'mcs-lite-connect';
import DataChannelWrapper from '../../dataChannelCards/common/wrapper';
import styles from './styles.css';

const DataChannelContentLayout = ({
  datachannels,
  onSubmit,
  onChangeDatachannel,
}) => (
  <div className={styles.dataChannelContent}>
    {
      datachannels.map((dataChannel) => {
        let displayName = dataChannel.channelType.name;
        if (dataChannel.type === 1) {
          displayName += '_Control';
        } else {
          displayName += '_Display';
        }
        return (
          <DataChannelWrapper
            key={dataChannel.datachannelId}
            displayName={displayName}
            isDevice
            onSubmit={onSubmit}
            onChangeDatachannel={onChangeDatachannel}
            id={dataChannel.datachannelId}
            title={dataChannel.datachannelName}
            className={styles.displayCard}
            value={dataChannel.datapoints.values || null}
            format={dataChannel.format}
            updatedAt={dataChannel.updatedAt}
            description={dataChannel.datachannelDescription}
          />
        );
      })
    }
  </div>
);

export default compose(
  pure,
  withState('datachannels', 'setDatachannels', props => props.datachannels),
  withHandlers({
    onMessage: props => (data) => {
      const datachannels = R.clone(props.datachannels);
      datachannels.forEach((k) => {
        if (k.datachannelId === data.datachannelId) {
          if (!k.datapoints) k.datapoints = { values: {}};
          k.datapoints.values = data.values;
          k.datapoints.updatedAt = data.updatedAt || new Date().getTime();
        }
      });
      props.setDatachannels(datachannels);
    },
  }),
  connectSocket(
    props => props.server,                            // 1. WebSocket URL
    props => datapoint => props.onMessage(datapoint), // 2. Viwer
    'sendMessage',                                    // 3. Sender
  ),
  withHandlers({
    onSubmit: props => (id, values) => {
      const datapoint = { datachannelId: id, values };
      props.sendMessage(JSON.stringify(datapoint)); // Remind: Upload datapoint via WebSocket.
    },
    onChangeDatachannel: props => (id, value) => {
      const datachannels = R.clone(props.datachannels);
      datachannels.forEach((k) => {
        if (k.datachannelId === id) {
          k.datapoints.values = value;
        }
      });
      props.setDatachannels(datachannels);
    },
  }),
)(DataChannelContentLayout);
