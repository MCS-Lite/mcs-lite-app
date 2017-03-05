import React from 'react';
import {
  compose,
  pure,
  withState,
} from 'recompose';
import { DataChannelAdapter } from 'mcs-lite-ui';

const DisplayStringLayout = ({
  value,
  setValue,
  id,
  format,
  onSubmit,
}) => (
  <DataChannelAdapter
    dataChannelProps={{
      id,
      type: 'FLOAT_CONTROL',
      values: { value },
      format,
    }}
    eventHandler={({ type, id: datachannelId, values }) => {
      switch (type) {
        case 'clear':
          setValue('');
          break;
        case 'change':
          setValue(values.value);
          break;
        case 'submit':
          onSubmit(datachannelId, { value: values.value });
          break;
        default:
      }
    }}
  />
);

export default compose(
  pure,
  withState('value', 'setValue', props => props.value || ''),
)(DisplayStringLayout);
