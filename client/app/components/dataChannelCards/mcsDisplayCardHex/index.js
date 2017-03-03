import React from 'react';
import { pure } from 'recompose';
import { DataChannelAdapter } from 'mcs-lite-ui';

const DisplayHexLayout = ({
  value = '',
  id,
}) => (
  <DataChannelAdapter
    dataChannelProps={{
      id,
      type: 'HEX_DISPLAY',
      values: { value },
    }}
  />
);

export default pure(DisplayHexLayout);
