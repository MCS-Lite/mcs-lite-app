import React from 'react';
import { compose, pure } from 'recompose';
import { DataChannelAdapter } from 'mcs-lite-ui';

const PreviewLayout = ({
  value,
}) => (
  <div style={{ width: '100%' }}>
    <DataChannelAdapter
      dataChannelProps={{
        id: '',
        type: 'GPIO_DISPLAY',
        values: { value },
      }}
    />
  </div>
);

export default compose(
  pure,
)(PreviewLayout);
