import React from 'react';
import {
  compose,
  pure,
  withState,
} from 'recompose';
import { DataChannelAdapter } from 'mcs-lite-ui';

const DisplayStringLayout = ({
  id,
  format,
  value,
  period,
  setValue,
  setPeriod,
  onSubmit,
}) => (
  <DataChannelAdapter
    dataChannelProps={{
      id,
      type: 'PWM_CONTROL',
      values: {
        value,
        period,
      },
      format,
    }}
    eventHandler={({ type, id: datachannelId, values }) => {
      switch (type) {
        case 'clear':
          setValue(0);
          setPeriod(0);
          break;
        case 'change':
          setValue(Number(values.value));
          setPeriod(Number(values.period));
          break;
        case 'submit':
          onSubmit(datachannelId, {
            value: Number(values.value),
            period: Number(values.period),
          });
          break;
        default:
      }
    }}
  />
);

export default compose(
  pure,
  withState('value', 'setValue', props => props.value || 0),
  withState('period', 'setPeriod', props => props.period || 0),
)(DisplayStringLayout);
