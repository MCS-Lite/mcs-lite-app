import React from 'react';
import { pure } from 'recompose';
import { DataChannelAdapter } from 'mcs-lite-ui';

const DisplayStringLayout = ({
  value,
  id,
  onSubmit,
}) => (
  <DataChannelAdapter
    dataChannelProps={{
      id,
      type: 'SWITCH_CONTROL',
      values: { value },
    }}
    eventHandler={
      ({
        id: datachannelId,
        values,
      }) => onSubmit(datachannelId, { value: values.value })
    }
  />
);

export default pure(DisplayStringLayout);
