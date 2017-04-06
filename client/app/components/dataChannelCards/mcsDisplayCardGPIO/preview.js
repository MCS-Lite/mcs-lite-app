import React from 'react';
import { compose, pure } from 'recompose';
import { DataChannelAdapter } from 'mcs-lite-ui';

const PreviewLayout = ({
  value,
}) => (
  <DataChannelAdapter
    dataChannelProps={{
      id: '',
      type: 'GPIO_DISPLAY',
      values: { value },
    }}
  />
);

export default compose(
  pure,
)(PreviewLayout);
