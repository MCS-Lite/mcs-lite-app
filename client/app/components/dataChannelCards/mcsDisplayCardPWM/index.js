import React from 'react';
import { pure } from 'recompose';
import { DataChannelAdapter } from 'mcs-lite-ui';

const DisplayPWMLayout = ({
  value,
  period,
  id,
  format,
}) => (
  <DataChannelAdapter
    dataChannelProps={{
      id,
      type: 'PWM_DISPLAY',
      values: { value, period },
      format,
    }}
  />
);

export default pure(DisplayPWMLayout);
