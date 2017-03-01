import React, { Component } from 'react';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';
import { default as withState } from 'recompose/withState';

import DataChannelAdapter from 'mcs-lite-ui/lib/DataChannelAdapter';

const PreviewLayout = ({
  format,
  value,
}) => {
  let labels = [];
  return (
    <div style={{ width: '100%' }}>
      <DataChannelAdapter
        dataChannelProps={{
          id: '',
          type: 'INTEGER_CONTROL',
          values: { value: value },
          format,
        }}
        eventHandler={console.log}
      />
    </div>
  );
}

export default compose(
  pure,
  withState('value', 'setValue', (props)=> props.value || 0),
  withState('format', 'setFormat', (props) => props.format || { unit: '' }),
)(PreviewLayout);