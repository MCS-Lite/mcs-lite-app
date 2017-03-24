import React from 'react';
import { compose, pure } from 'recompose';
import { DataChannelAdapter } from 'mcs-lite-ui';

const PreviewLayout = (
  {
    value,
    format,
  }
) => (
  <div style={{ width: '100%' }}>
    <DataChannelAdapter
      dataChannelProps={{
        id: '',
        type: 'STRING_DISPLAY',
        values: { value },
        format,
      }}
    />
  </div>
);

export default compose(pure)(PreviewLayout);
