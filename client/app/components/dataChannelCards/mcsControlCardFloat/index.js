import React from 'react';
import {
  compose,
  pure,
} from 'recompose';
import { DataChannelAdapter } from 'mcs-lite-ui';

const DisplayStringLayout = ({
  value,
  id,
  format,
  onSubmit,
  onChangeDatachannel,
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
          onChangeDatachannel(datachannelId, { value: '' });
          break;
        case 'change':
          onChangeDatachannel(datachannelId, { value: values.value });
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
)(DisplayStringLayout);
