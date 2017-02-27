import React, { Component } from 'react';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';
import { default as withState } from 'recompose/withState';
import { default as withHandlers } from 'recompose/withHandlers';
import { default as lifecycle } from 'recompose/lifecycle';

import DataChannelWrapper from '../../dataChannelCards/common/wrapper';
import { WebsocketStore, WebsocketActions } from 'react-websocket-flux';

import styles from './styles.css';

import { w3cwebsocket } from 'websocket';
import assign from 'object-assign';

import { EventEmitter } from 'fbemitter';
let emitter = new EventEmitter();

const DataChannelContentLayout = ({
  datachannels,
  deviceId,
  deviceKey,
  server,
  onSubmit,
  isUpdate,
}) => {
  return (
    <div className={styles.dataChannelContent}>
      {
        typeof datachannels === 'object' && isUpdate ?
          datachannels.map((dataChannel, v)=>{
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
                value={(dataChannel.datapoints && dataChannel.datapoints.value) || null}
                format={dataChannel.format}
                updatedAt={dataChannel.updatedAt}
                description={dataChannel.datachannelDescription}
              />
            );
          })
        :
        ''
      }
    </div>
  );
}

export default compose(
  pure,
  withState('datapoints', 'setDatapoints', (props)=> {
    // console.log(props.datachannels);
  }),
  withState('isUpdate', 'setIsUpdate', false),
  withHandlers({
    onMessage: (props) => (data) =>{
      console.log(data);
      props.setIsUpdate(false);
      console.log(props.datachannels);
      props.datachannels.forEach((k, v) => {
        if (k.datachannelId == data.datachannelId) {
          if (!k.datapoints) k.datapoints = {};
          k.datapoints.value = data.data.value;
          k.datapoints.updatedAt = data.data.updatedAt || new Date().getTime();
        }
      })
      props.setIsUpdate(true);
    },

    onSubmit: (props) => (id, value) => {
      emitter.emit('submit', id, value);
    },
  }),
  lifecycle({
    componentWillMount() {
      WebsocketActions.connect(this.props.server + '/viewer');
      assign(new w3cwebsocket(this.props.server), {
        onopen: function() {
          let _ = this;
          emitter.addListener('submit', function(id, value) {
            _.send(JSON.stringify(
              {
                datachannelId: id,
                data: {
                  value: value,
                }
              }
            ));
          });
          // console.log(ws.send(JSON.stringify({datachannelId: 'float', data: { value: 123 }})));
        }
      });
      this.props.setIsUpdate(true);
    },
    componentDidMount() {
      WebsocketStore.addMessageListener(this.props.onMessage);
    },
    componentWillUnmount() {
      emitter.remove();
      WebsocketStore.removeMessageListener(this.props.onMessage);
    },
  })
)(DataChannelContentLayout);