import React, { Component } from 'react';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';
import { default as withState } from 'recompose/withState';
import { default as withHandlers } from 'recompose/withHandlers';
import { default as lifecycle } from 'recompose/lifecycle';

import DataChannelCard from 'mcs-lite-ui/lib/DataChannelCard';
import DataChannelAdapter from 'mcs-lite-ui/lib/DataChannelAdapter';

import More from '../common/more';
import moment from 'moment';

const DisplayStringLayout = ({
  updatedAt,
  value,
  setValue,
  description,
  className,
  title,
  id,
  format,
  isPrototype,
  isDevice,
}) => {
  return (
    <DataChannelCard
      className={className}
      title={title}
      subtitle={'Last data point time : ' + moment(updatedAt).format('YYYY-MM-DD h:mm')}
      description={description}
      header={<More isPrototype={isPrototype} isDevice={isDevice}/>}
    >
      <DataChannelAdapter
        dataChannelProps={{
          id,
          type: 'CATEGORY_CONTROL',
          values: { value: value },
          format,
        }}
        eventHandler={console.log}
      />
    </DataChannelCard>
  );
}

export default compose(
  pure,
  withState('value', 'setValue', (props)=> props.value || ''),
  withState('updatedAt', 'setUpdatedAt', (props)=> props.updatedAt || ''),
)(DisplayStringLayout)

