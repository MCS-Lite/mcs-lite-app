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

const DisplayStringLayout = ({
  updatedAt,
  description,
  className,
  title,
  id,
  format,
  value,
  period,
  setValue,
  setPeriod,
  isPrototype,
  isDevice,
  onSubmit,
}) => (
  <DataChannelCard
    className={className}
    title={title}
    subtitle={`Last data point time : ${moment(updatedAt).format('YYYY-MM-DD h:mm')}`}
    description={description}
    header={
      <More isPrototype={isPrototype} isDevice={isDevice} />
    }
  >
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
        console.log(values);
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
  </DataChannelCard>
);

export default compose(
  pure,
  withState('value', 'setValue', props => props.value || 0),
  withState('period', 'setPeriod', props => props.period || 0),
  withState('updatedAt', 'setUpdatedAt', props => props.updatedAt || ''),
)(DisplayStringLayout);
