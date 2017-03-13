import React from 'react';
import {
  compose,
  pure,
} from 'recompose';
import { DataChannelAdapter } from 'mcs-lite-ui';

const DisplayStringLayout = ({
  value,
  onChangeDatachannel,
  id,
  onSubmit,
}) => (
  <DataChannelAdapter
    dataChannelProps={{
      id,
      type: 'HEX_CONTROL',
      values: { value },
    }}
    eventHandler={({ type, id: datachannelId, values }) => {
      switch (type) {
        case 'CLEAR':
          onChangeDatachannel(datachannelId, { value: '' });
          break;
        case 'CHANGE':
          onChangeDatachannel(datachannelId, { value: values.value });
          break;
        case 'SUBMIT':
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
