import React from 'react';
import {
  compose,
  pure,
  withHandlers,
  withState,
  withProps,
} from 'recompose';
import R from 'ramda';
import { connectSocket } from 'mcs-lite-connect';
import DataChannelWrapper from '../../dataChannelCards/common/wrapper';
import styles from './styles.css';

const DataChannelContentLayout = ({
  datachannels,
  onSubmit,
  onChangeDatachannel,
  retrieveDatachannelDatapoint,
  datapointsSet = {},
  deviceId,
  deviceKey,
  setNewDatapointsSet,
  newDatapointsSet,
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
            deviceId={deviceId}
            deviceKey={deviceKey}
            title={dataChannel.datachannelName}
            value={dataChannel.datapoints.values || {}}
            format={dataChannel.format}
            updatedAt={dataChannel.updatedAt}
            description={dataChannel.datachannelDescription}
            retrieveDatachannelDatapoint={retrieveDatachannelDatapoint}
            datapoints={datapointsSet[dataChannel.datachannelId]}
            setNewDatapointsSet={setNewDatapointsSet}
            newDatapointsSet={newDatapointsSet}
            hasHistory={dataChannel.hasHistory}
          />
        );
      })
    }
  </div>
);

export default compose(
  pure,
  withState('datachannels', 'setDatachannels', props => props.datachannels),
  withState('newDatapointsSet', 'setNewDatapointsSet', {}),
  withHandlers({
    onMessage: props => (data) => {
      const { datachannelId } = data;
      const index = R.findIndex(
        R.propEq('datachannelId', datachannelId),
      )(props.datachannels);

      if (index > -1) {
        const newDatapoint = {
          values: data.values,
          updatedAt: data.updatedAt || new Date().getTime(),
        };

        props.setDatachannels(R.update(
          index,
          R.merge(props.datachannels[index], { datapoints: newDatapoint }),
          props.datachannels),
        );

        props.setNewDatapointsSet(
          R.assoc(datachannelId, [
            ...R.pathOr([], ['newDatapointsSet', datachannelId], props),
            newDatapoint,
          ], props.newDatapointsSet),
        );
      }
    },
  }),
  connectSocket(
    // 1. urlMapper => (ownerProps: Object) => string
    props => props.server,

    // 2. onMessage => (ownerProps: Object) => datapoint => void
    props => datapoint => props.onMessage(datapoint),

    // 3. propsMapper => state => props
    ({ readyState, send, createWebSocket }) => ({
      sendMessage: send,
      isWebSocketClose: readyState.sender === 3 || readyState.viewer === 3,
      reconnect: createWebSocket,
    }),
  ),
  withProps((props) => {
    const retrievedDatachannelDatapointsSet = props.datachannelDatapoints;
    const newDatachannelDatapointsSet = props.newDatapointsSet;

    const datapointsSet = R.mergeWith(
      R.concat,
      retrievedDatachannelDatapointsSet,
      newDatachannelDatapointsSet,
    );

    return { datapointsSet };
  }),
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
