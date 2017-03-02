import React from 'react';
import {
  compose,
  pure,
  withState,
} from 'recompose';
import {
  DataChannelCard,
  DataChannelAdapter,
} from 'mcs-lite-ui';
import moment from 'moment';
import More from '../common/more';

const DisplayPWMLayout = ({
  updatedAt,
  value,
  description,
  className,
  title,
  id,
  isPrototype,
  isDevice,
  format,
}) => (
  <DataChannelCard
    className={className}
    title={title}
    subtitle={'Last data point time : ' + moment(updatedAt).format('YYYY-MM-DD h:mm')}
    description={description}
    header={<More isPrototype={isPrototype} isDevice={isDevice}/>}
  >
    <DataChannelAdapter
      dataChannelProps={{
        id,
        type: 'PWM_DISPLAY',
        values: { value: value.value, period: value.period },
        format,
      }}
    />
  </DataChannelCard>
);


export default compose(
  pure,
  withState('value', 'setValue', (props)=> props.value || { value: 0, period: 0 }),
  withState('updatedAt', 'setUpdatedAt', (props)=> props.updatedAt || ''),
)(DisplayPWMLayout);
