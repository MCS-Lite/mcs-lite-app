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
  console.log(format);
  return (
    <div style={{ width: '100%' }}>
      <DataChannelAdapter
        dataChannelProps={{
          id: '',
          type: 'FLOAT_CONTROL',
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
  withState('format', 'setFormat', (props) => props.format || { unit: '' }),
)(PreviewLayout);