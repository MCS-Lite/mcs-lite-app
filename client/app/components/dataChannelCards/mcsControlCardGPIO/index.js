import React from 'react';
import { compose, pure } from 'recompose';
import { DataChannelAdapter } from 'mcs-lite-ui';

const DisplayStringLayout = (
  {
    value,
    id,
    onSubmit,
  }
) => (
  <DataChannelAdapter
    dataChannelProps={{
      id,
      type: 'GPIO_CONTROL',
      values: { value },
    }}
    eventHandler={({ id: datachannelId, values }) => {
      onSubmit(datachannelId, { value: Number(values.value) });
    }}
  />
);

export default compose(pure)(DisplayStringLayout);
