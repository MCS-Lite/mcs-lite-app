import React from 'react';
import { compose, pure, withState } from 'recompose';
import { DataChannelAdapter } from 'mcs-lite-ui';

const PreviewLayout = ({
  value,
  format,
}) => (
  <div style={{ width: '100%' }}>
    <DataChannelAdapter
      dataChannelProps={{
        id: '',
        type: 'PWM_DISPLAY',
        values: { value: value.value, period: value.period },
        format,
      }}
      eventHandler={console.log}
    />
  </div>
);

export default compose(
  pure,
  withState('value', 'setValue', props => props.value || { value: 0, period: 0 }),
)(PreviewLayout);
