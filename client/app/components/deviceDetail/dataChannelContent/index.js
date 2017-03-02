import React from 'react';
import {
  compose,
  pure,
  withHandlers,
  withState,
  lifecycle,
} from 'recompose';
import {
  WebsocketStore,
  WebsocketActions,
} from 'react-websocket-flux';
import { w3cwebsocket } from 'websocket';
import assign from 'object-assign';
import { EventEmitter } from 'fbemitter';

import DataChannelWrapper from '../../dataChannelCards/common/wrapper';
import styles from './styles.css';

const emitter = new EventEmitter();
const DataChannelContentLayout = ({
  datachannels,
  onSubmit,
  isUpdate,
}) => (
  <div className={styles.dataChannelContent}>
    {
      typeof datachannels === 'object' && isUpdate &&
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
  withState('emitter', 'setEmitter', {}),
  withState('isUpdate', 'setIsUpdate', false),
  withState('datachannels', 'setDatachannels', props => props.datachannels),
  withHandlers({
    onMessage: props => (data) => {
      props.setIsUpdate(false);
      props.datachannels.forEach((k) => {
        if (k.datachannelId === data.datachannelId) {
          if (!k.datapoints) k.datapoints = {values: {}};
          k.datapoints.values = data.values;
          k.datapoints.updatedAt = data.updatedAt || new Date().getTime();
        }
      });
      props.setIsUpdate(true);
    },

    onSubmit: () => (id, value) => {
      emitter.emit('submit', id, value);
    },
  }),
  lifecycle({
    componentWillMount() {
      WebsocketActions.connect(this.props.server + '/viewer');
      let _this = this;
      assign(new w3cwebsocket(this.props.server), {
        onopen: function() {
          const _ = this;
          _this.props.setEmitter(
            emitter.addListener(
              'submit',
              (id, value) => {
                _.send(JSON.stringify(
                  {
                    datachannelId: id,
                    values: {
                      value,
                    },
                  },
                ));
              },
            ),
          );
        },
      });
      this.props.setIsUpdate(true);
    },
    componentDidMount() {
      WebsocketStore.addMessageListener(this.props.onMessage);
    },
    componentWillUnmount() {
      this.props.emitter.remove();
      WebsocketStore.removeMessageListener(this.props.onMessage);
    },
  }),
)(DataChannelContentLayout);
