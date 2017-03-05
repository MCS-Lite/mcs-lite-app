import React from 'react';
import { pure } from 'recompose';
import { DataChannelAdapter } from 'mcs-lite-ui';

const DisplayStringLayout = ({
  value = '',
  format,
  id,
}) => (
  <DataChannelAdapter
    dataChannelProps={{
      id,
      type: 'STRING_DISPLAY',
      values: { value },
      format,
    }}
  />
);

export default pure(DisplayStringLayout);
