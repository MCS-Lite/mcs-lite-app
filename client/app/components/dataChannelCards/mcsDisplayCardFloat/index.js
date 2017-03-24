import React from 'react';
import { pure } from 'recompose';
import { DataChannelAdapter } from 'mcs-lite-ui';

const DisplayFloatLayout = (
  {
    value = 0,
    id,
    format,
  }
) => (
  <DataChannelAdapter
    dataChannelProps={{
      id,
      type: 'FLOAT_DISPLAY',
      values: { value },
      format,
    }}
  />
);

export default pure(DisplayFloatLayout);
