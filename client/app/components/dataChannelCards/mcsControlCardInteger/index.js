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
      type: 'INTEGER_CONTROL',
      values: { value },
      format,
    }}
    eventHandler={({ type, id: datachannelId, values }) => {
      switch (type) {
        case 'clear':
          setValue('');
          break;
        case 'change':
          setValue(Number(values.value));
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
  withState('value', 'setValue', props => props.value || 0),
)(DisplayStringLayout);
