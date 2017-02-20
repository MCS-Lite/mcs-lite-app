import React, { Component } from 'react';
import { render } from 'react-dom';
import { WebsocketStore, WebsocketActions } from 'react-websocket-flux';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';
import { default as withState } from 'recompose/withState';
import { default as withHandlers } from 'recompose/withHandlers';
import { default as lifecycle } from 'recompose/lifecycle';

import DataChannelCard from 'mcs-lite-ui/lib/DataChannelCard';
import DataChannelAdapter from 'mcs-lite-ui/lib/DataChannelAdapter';

import moment from 'moment';

const DisplayStringLayout = ({
  updatedAt,
  value,
  setValue,
  description,
  className,
  title,
  id,
}) => {
  return (
    <DataChannelCard
      className={className}
      title={title}
      subtitle={'Last data point time : ' + moment(updatedAt).format('YYYY-MM-DD h:mm')}
      description={description}
      header={<a href="">Link</a>}
    >
      <DataChannelAdapter
        dataChannelProps={{
          id,
          type: 'STRING_DISPLAY',
          values: { value: value },
        }}
        eventHandler={({type, id, value}) => {
          console.log(type);
          switch(type) {
            case 'clear':
              setValue('');
              break;
            case 'change':
              setValue(value);
              break;
            case 'submit':
              break;
            default:
          }
        }}
      />
    </DataChannelCard>
  );
}

export default compose(
  pure,
  withState('value', 'setValue', (props)=> props.value || ''),
  withState('updatedAt', 'setUpdatedAt', (props)=> props.updatedAt || ''),
  withHandlers({
    onMessage: (props) => (data) =>{
      console.log(data);
    }
  }),
  lifecycle({
    componentWillMount() {
      WebsocketActions.connect(this.props.server);
    },
    componentDidMount() {
      WebsocketStore.addMessageListener(this.props.onMessage);
    },
    componentWillUnmount() {
      WebsocketStore.removeMessageListener(this.props.onMessage);
    },
  })
)(DisplayStringLayout)

