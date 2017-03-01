import React, { Component } from 'react';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';
import { default as withState } from 'recompose/withState';
import { default as withHandlers } from 'recompose/withHandlers';
import { default as lifecycle } from 'recompose/lifecycle';

import DataChannelCard from 'mcs-lite-ui/lib/DataChannelCard';
import DataChannelAdapter from 'mcs-lite-ui/lib/DataChannelAdapter';

import moment from 'moment';
import More from '../common/more';

const DisplayHexLayout = ({
  updatedAt,
  value,
  setValue,
  description,
  className,
  title,
  id,
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
          type: 'HEX_DISPLAY',
          values: { value: value },
        }}
      />
    </DataChannelCard>
  );
}

export default compose(
  pure,
  withState('value', 'setValue', (props)=> props.value || ''),
  withState('updatedAt', 'setUpdatedAt', (props)=> props.updatedAt || ''),
)(DisplayHexLayout)

