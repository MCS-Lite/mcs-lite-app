import React from 'react';
import { pure } from 'recompose';
import { DataChannelAdapter } from 'mcs-lite-ui';

const DisplayStringLayout = ({
  value = '',
  id,
  format,
}) => (
  <DataChannelAdapter
    dataChannelProps={{
      id,
      type: 'CATEGORY_CONTROL',
      values: { value },
      format,
    }}
  />
);

export default pure(DisplayStringLayout);
