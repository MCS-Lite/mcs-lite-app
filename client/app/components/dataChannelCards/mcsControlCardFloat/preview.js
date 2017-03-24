import React from 'react';
import { compose, pure, withState } from 'recompose';
import { DataChannelAdapter } from 'mcs-lite-ui';

const PreviewLayout = (
  {
    format,
    value,
  }
) => (
  <div style={{ width: '100%' }}>
    <DataChannelAdapter
      dataChannelProps={{
        id: '',
        type: 'FLOAT_CONTROL',
        values: { value },
        format,
      }}
    />
  </div>
);

export default compose(
  pure,
  withState('value', 'setValue', props => props.value || 0),
  withState('format', 'setFormat', props => props.format || { unit: '' })
)(PreviewLayout);
