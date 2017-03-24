import React from 'react';
import { pure } from 'recompose';
import { DataChannelAdapter } from 'mcs-lite-ui';

const DisplayIntegerLayout = (
  {
    value = 0,
    id,
    format,
  }
) => (
  <DataChannelAdapter
    dataChannelProps={{
      id,
      type: 'INTEGER_DISPLAY',
      values: { value },
      format,
    }}
  />
);

export default pure(DisplayIntegerLayout);
