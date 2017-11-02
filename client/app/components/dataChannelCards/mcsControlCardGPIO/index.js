import React from 'react';
import {
  compose,
  pure,
} from 'recompose';
import { DataChannelAdapter } from 'mcs-lite-ui';

const DisplayStringLayout = ({
  value,
  id,
  onSubmit,
  onChangeDatachannel,
}) => (
  <DataChannelAdapter
    dataChannelProps={{
      id,
      type: 'GPIO_CONTROL',
      values: { value },
    }}
    eventHandler={({ id: datachannelId, values, type }) => {
      const newValues = { value: Number(values.value) };

      switch (type) {
        case 'SUBMIT':
          // Remind: MUST upload the datapoint via WebSocket.
          onSubmit(datachannelId, newValues);
          break;
        default:
          // Remind: Just change the state.
          onChangeDatachannel(datachannelId, newValues);
          break;
      }
    }}
  />
);

export default compose(
  pure,
)(DisplayStringLayout);
