import React from 'react';
import {
  compose,
  pure,
} from 'recompose';
import { DataChannelAdapter } from 'mcs-lite-ui';

const DisplayStringLayout = ({
  id,
  format,
  value,
  period,
  onChangeDatachannel,
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
        case 'CHANGE':
          onChangeDatachannel(datachannelId, {
            value: values.value,
            period: values.period,
          });
          break;
        case 'SUBMIT':
          onSubmit(datachannelId, {
            value: values.value,
            period: values.period,
          });
          break;
        default:
      }
    }}
  />
);

export default compose(
  pure,
)(DisplayStringLayout);
