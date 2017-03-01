import React, { Component } from 'react';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';
import { default as withState} from 'recompose/withState';

import DataChannelAdapter from 'mcs-lite-ui/lib/DataChannelAdapter';

const PreviewLayout = ({
  value,
  period,
  format,
}) => {
  let labels = [];
  return (
    <div style={{ width: '100%' }}>
      <DataChannelAdapter
        dataChannelProps={{
          id: "",
          type: 'PWM_CONTROL',
          values: { value, period, },
          format,
        }}
        eventHandler={console.log}
      />
    </div>
  );
}

export default compose(
  pure,
  withState('value', 'setValue', (props)=> props.value || 0),
  withState('period', 'setPeriod', (props)=> props.period || 0),
  withState('format', 'setFormat', (props) => props.format || { lowerbound: 0, upperbound: 1 }),
)(PreviewLayout);