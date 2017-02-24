import React, { Component } from 'react';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';

import DataChannelAdapter from 'mcs-lite-ui/lib/DataChannelAdapter';

const PreviewLayout = ({
  value,
  format,
}) => {
  let labels = [];
  return (
    <div style={{ width: '100%' }}>
      <DataChannelAdapter
        dataChannelProps={{
          id: '',
          type: 'STRING_DISPLAY',
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
)(PreviewLayout);